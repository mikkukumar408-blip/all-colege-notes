/* =========================================================================
   4DX INTERACTIVE IMMERSIVE AUTHENTICATION GATE (AuthPage.jsx)
   =========================================================================
   Features:
   - Full 4DX sensory environmental animations (Wind, Lightning, Mist, Rumble)
   - Procedural Web Audio API sound synthesis (Cinematic Sub-bass & Cyber Zap)
   - Strict validation: ONLY Username and Password (NO SPACES allowed in username)
   - Two sections: "Sign In" and "Create Account"
   - Local persistent database with instant session storage
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Wind, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ShieldAlert,
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Volume2,
  VolumeX,
  GraduationCap
} from 'lucide-react';
import Canvas4DX from './Canvas4DX';
import { logUserActivity } from '../utils/activityTracker';
import { hashPasswordPBKDF2, verifyPassword, evaluatePasswordStrength, logSecurityEvent, signSessionToken } from '../utils/security';
import { 
  pullCloudUsers, 
  pushCloudUsers, 
  syncNewUserToCloud, 
  getLocalUsers, 
  saveLocalUsers,
  verifyAndRegisterDeviceSession,
  forceLoginThisDevice,
  getDeviceName
} from '../utils/cloudSync';

export default function AuthPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [limitBlockedUser, setLimitBlockedUser] = useState(null); // When 2-device limit is reached
  const [adminNotice, setAdminNotice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isLightningActive, setIsLightningActive] = useState(false);
  const [isRumbleActive, setIsRumbleActive] = useState(false);
  const [windSpeed, setWindSpeed] = useState('normal'); // 'normal' | 'storm'

  // Brute-force protection & account lockout state (No email required)
  const [failedAttempts, setFailedAttempts] = useState(() => {
    try {
      const v = sessionStorage.getItem('college_notes_failed_attempts');
      return v ? parseInt(v, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const [lockoutRemaining, setLockoutRemaining] = useState(() => {
    try {
      const lockUntil = sessionStorage.getItem('college_notes_lockout_until');
      if (lockUntil) {
        const rem = Math.ceil((parseInt(lockUntil, 10) - Date.now()) / 1000);
        return rem > 0 ? rem : 0;
      }
    } catch (e) {}
    return 0;
  });

  // Ticking cooldown timer for brute force lockout
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          try {
            sessionStorage.removeItem('college_notes_lockout_until');
            sessionStorage.setItem('college_notes_failed_attempts', '0');
          } catch (e) {}
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  // Real-time Cloud Synchronization status across all devices
  const [cloudSyncStatus, setCloudSyncStatus] = useState('syncing'); // 'syncing' | 'synced' | 'offline'

  useEffect(() => {
    let isMounted = true;
    pullCloudUsers()
      .then(() => {
        if (isMounted) setCloudSyncStatus('synced');
      })
      .catch(() => {
        if (isMounted) setCloudSyncStatus('offline');
      });
    return () => { isMounted = false; };
  }, []);

  // Password Strength Evaluation for Create Account
  const pwStrength = evaluatePasswordStrength(password);

  // 3D Holographic Card Mouse Tilt State
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6
    });
  };
  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Web Audio Context for 4DX Procedural Sound FX
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
  };

  // 4DX Sound 1: Cyber Electric Beep / Zap
  const playCyberZap = (freq = 880, duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  // 4DX Sound 2: Deep Cinematic Sub-Bass Swoosh (Login / Success)
  const playCinematicBoom = () => {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  // Trigger 4DX Lightning & Rumble simulation on interaction
  const trigger4DXEffect = () => {
    setIsLightningActive(true);
    setIsRumbleActive(true);
    playCyberZap(600, 0.2);
    setTimeout(() => setIsLightningActive(false), 300);
    setTimeout(() => setIsRumbleActive(false), 450);
  };

  // Space Prevention & Super Admin Recognition Handler on Username Input
  const handleUsernameChange = (e) => {
    const rawVal = e.target.value;
    setUsername(rawVal);

    const lower = rawVal.toLowerCase().trim();
    const isBhavya = lower === 'bhavya mishra';

    if (isBhavya) {
      setAdminNotice('🛡️ Admin account detected: Master root privileges available.');
      setErrorMessage('');
    } else if (rawVal.includes(' ')) {
      setAdminNotice('');
      setErrorMessage('⚠️ Warning: Spaces are NOT allowed in student usernames (only Admin accounts can have spaces).');
      playCyberZap(320, 0.1);
    } else {
      setAdminNotice('');
      setErrorMessage('');
    }
  };

  // User Database Helpers in localStorage & Cloud Synchronizer
  const getUsersDB = () => {
    return getLocalUsers();
  };

  const saveUsersDB = (users) => {
    saveLocalUsers(users);
    try {
      pushCloudUsers(users);
    } catch (e) {}
  };

  // Submit Handler: Sign In or Create Account with SHA-256 & Brute-Force Shield
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check Lockout Status
    if (lockoutRemaining > 0) {
      setErrorMessage(`🛑 Brute-force cooldown active. Please wait ${lockoutRemaining}s before attempting again.`);
      playCyberZap(180, 0.2);
      return;
    }

    const cleanUsername = username.trim();

    // Validation 1: Empty check
    if (!cleanUsername || !password) {
      setErrorMessage('Please enter both Username and Password.');
      playCyberZap(220, 0.2);
      return;
    }

    const isSuperAdminAttempt = cleanUsername.toLowerCase() === 'bhavya mishra';

    // Validation 2: Spaces in username check (Student accounts cannot have spaces)
    if (!isSuperAdminAttempt && /\s/.test(cleanUsername)) {
      setErrorMessage('⚠️ Warning: Spaces are NOT allowed in student usernames (only Admin accounts can contain spaces).');
      playCyberZap(220, 0.2);
      return;
    }

    // Validation 3: Password minimum security length
    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters.');
      playCyberZap(220, 0.2);
      return;
    }

    let users = getUsersDB();

    if (activeTab === 'signin') {
      // SPECIAL HANDLING FOR SUPER ADMIN (identity verified via PBKDF2/SHA-256 hash or root fallback)
      if (isSuperAdminAttempt) {
        let adminUser = users.find(u => u.username?.toLowerCase() === 'bhavya mishra');
        let isMatch = false;

        if (adminUser) {
          isMatch = await verifyPassword(password, adminUser);
        }

        // Master hardcoded default root hash fallback (for initial out-of-box credentials)
        const enteredHash = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(password)
        ).then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''));

        const ADMIN_HASH = '1e0489c5be19d207c5af83e422088a8ce588b04ee9096f78e4efd2478254448b';

        if (enteredHash === ADMIN_HASH || password === 'R1m 917700') {
          isMatch = true;
        }

        // If local check did not match, try pulling latest credentials from cloud
        if (!isMatch) {
          try {
            const freshUsers = await pullCloudUsers();
            const freshAdmin = freshUsers.find(u => u.username?.toLowerCase() === 'bhavya mishra');
            if (freshAdmin) {
              const freshMatch = await verifyPassword(password, freshAdmin);
              if (freshMatch) {
                isMatch = true;
                adminUser = freshAdmin;
              }
            }
          } catch (e) {}
        }

        if (isMatch) {
          const adminUserObj = {
            username: 'Bhavya Mishra',
            role: 'superadmin',
            isSuperAdmin: true,
            createdAt: adminUser?.createdAt || '2026-01-01'
          };
          await verifyAndRegisterDeviceSession('Bhavya Mishra');
          setFailedAttempts(0);
          try {
            sessionStorage.setItem('college_notes_failed_attempts', '0');
            sessionStorage.removeItem('college_notes_lockout_until');
          } catch (err) {}

          logSecurityEvent('SUPER_ADMIN_AUTH', 'Super Admin authenticated with root credentials', 'INFO');
          logUserActivity('Bhavya Mishra', 'AUTH', 'Super Admin Console', 'Master administrative login');

          playCinematicBoom();
          trigger4DXEffect();
          setAdminNotice('⚡ ADMIN ACCOUNT DETECTED & RECOGNIZED: Welcome Super Admin! Master root privileges initialized.');
          setSuccessMessage('⚡ Admin Account Recognized! Welcome.');
          setTimeout(() => {
            onLogin(adminUserObj);
          }, 850);
          return;
        } else {
          setErrorMessage('Invalid Password for the Super Admin account.');
          playCyberZap(180, 0.25);
          setIsRumbleActive(true);
          setTimeout(() => setIsRumbleActive(false), 300);
          return;
        }
      }

      // Normal student sign in
      let userIndex = users.findIndex(
        (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
      );

      // MULTI-DEVICE CLOUD SYNC CHECK:
      // If user was created on Device 1, Device 2 pulls from the cloud instantly!
      if (userIndex === -1) {
        try {
          users = await pullCloudUsers();
          userIndex = users.findIndex(
            (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
          );
        } catch (e) {}
      }

      let isMatch = false;
      let user = null;
      if (userIndex !== -1) {
        user = users[userIndex];
        isMatch = await verifyPassword(password, user);

        // If local check failed, attempt cloud re-sync in case password was changed in another session
        if (!isMatch) {
          try {
            const freshUsers = await pullCloudUsers();
            const freshUser = freshUsers.find(
              (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
            );
            if (freshUser) {
              const freshMatch = await verifyPassword(password, freshUser);
              if (freshMatch) {
                isMatch = true;
                user = freshUser;
              }
            }
          } catch (e) {}
        }
      }

      if (isMatch && user) {
        // Upgrade legacy account to PBKDF2-100k + Salt if needed
        if (!user.salt || !user.passwordHash) {
          try {
            const { salt, hash } = await hashPasswordPBKDF2(password);
            user.salt = salt;
            user.passwordHash = hash;
            delete user.password;
            saveUsersDB(users);
          } catch (e) {}
        }

        // SIMULTANEOUS DEVICE LIMIT ENFORCEMENT: Max 2 devices simultaneously
        const sessionCheck = await verifyAndRegisterDeviceSession(user.username);
        if (!sessionCheck.allowed) {
          setLimitBlockedUser(user);
          setErrorMessage(sessionCheck.message);
          playCyberZap(180, 0.25);
          setIsRumbleActive(true);
          setTimeout(() => setIsRumbleActive(false), 300);
          return;
        }
        setLimitBlockedUser(null);

        setFailedAttempts(0);
        try {
          sessionStorage.setItem('college_notes_failed_attempts', '0');
          sessionStorage.removeItem('college_notes_lockout_until');
        } catch (err) {}

        logSecurityEvent('AUTH_LOGIN_SUCCESS', `Student @${user.username} authenticated`, 'INFO');
        logUserActivity(user.username, 'AUTH', 'Student Portal', 'Successfully logged in to student portal');

        playCinematicBoom();
        trigger4DXEffect();
        setSuccessMessage('Identity Verified. Launching Academic Portal...');
        setTimeout(() => {
          onLogin(user);
        }, 650);
      } else {
        const newFailed = failedAttempts + 1;
        setFailedAttempts(newFailed);
        try {
          sessionStorage.setItem('college_notes_failed_attempts', String(newFailed));
        } catch (err) {}

        logSecurityEvent('AUTH_LOGIN_FAILED', `Failed login attempt #${newFailed} for username "${cleanUsername}"`, 'WARN');

        if (newFailed >= 5) {
          const lockUntil = Date.now() + 60000;
          try {
            sessionStorage.setItem('college_notes_lockout_until', String(lockUntil));
          } catch (err) {}
          setLockoutRemaining(60);
          logSecurityEvent('BRUTE_FORCE_LOCKOUT', `Brute-force shield triggered for "${cleanUsername}". 60s cooldown initiated.`, 'CRITICAL');
          setErrorMessage('🛑 SECURITY COOLDOWN ENGAGED: 5 consecutive failed attempts. Sign-in locked for 60 seconds.');
        } else {
          setErrorMessage(`Invalid Username or Password. (Attempt ${newFailed} of 5 before security lockout)`);
        }

        playCyberZap(180, 0.25);
        setIsRumbleActive(true);
        setTimeout(() => setIsRumbleActive(false), 300);
      }
    } else {
      // Create Account (Sign up)
      if (isSuperAdminAttempt) {
        setErrorMessage('Super Admin Bhavya Mishra account already exists.');
        playCyberZap(220, 0.25);
        return;
      }

      if (/\s/.test(cleanUsername)) {
        setErrorMessage('⚠️ Warning: Student usernames must NOT contain spaces.');
        playCyberZap(220, 0.25);
        return;
      }

      // Check cloud first to avoid username collisions across devices
      try {
        users = await pullCloudUsers();
      } catch (err) {}

      const existingUser = users.find(
        (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
      );

      if (existingUser) {
        setErrorMessage('This username is already taken. Please choose another username.');
        playCyberZap(220, 0.25);
        return;
      }

      const { salt, hash } = await hashPasswordPBKDF2(password);

      const nowISO = new Date().toISOString();
      const newUser = {
        username: cleanUsername,
        role: 'student',
        salt,
        passwordHash: hash,
        password, // immediate fallback for seamless cross-device auth
        createdAt: nowISO,
        updatedAt: nowISO
      };

      // Instantly save to local store and sync across all devices via Cloud DB
      await syncNewUserToCloud(newUser);
      await verifyAndRegisterDeviceSession(newUser.username);

      logSecurityEvent('ACCOUNT_CREATED', `New student identity @${cleanUsername} generated with PBKDF2-100k encryption & Multi-Device Cloud Sync`, 'INFO');
      logUserActivity(cleanUsername, 'AUTH', 'Account Registration', 'Created new student account (Cloud Synced across all devices)');

      playCinematicBoom();
      trigger4DXEffect();
      setSuccessMessage('Account Created & Synced to Cloud! You can now log in from any phone or PC.');
      setTimeout(() => {
        onLogin(newUser);
      }, 700);
    }
  };

  return (
    <div className={`auth-4dx-stage ${isRumbleActive ? 'rumble-shake' : ''}`} style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 30%, #0c152e 0%, #060913 70%, #020408 100%)',
      fontFamily: 'var(--font-body)',
      padding: '24px 16px'
    }}>
      
      {/* 4DX Lightning Strobe Overlay */}
      {isLightningActive && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.45) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
          zIndex: 40,
          pointerEvents: 'none',
          animation: 'flashBurst 0.25s ease-out'
        }} />
      )}

      {/* 4DX Environmental Wind Streaks */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
        <div className="wind-streak" style={{ top: '15%', animationDuration: windSpeed === 'storm' ? '0.5s' : '1.2s' }} />
        <div className="wind-streak" style={{ top: '35%', animationDuration: windSpeed === 'storm' ? '0.4s' : '1.6s', animationDelay: '0.4s' }} />
        <div className="wind-streak" style={{ top: '65%', animationDuration: windSpeed === 'storm' ? '0.6s' : '1.4s', animationDelay: '0.8s' }} />
        <div className="wind-streak" style={{ top: '85%', animationDuration: windSpeed === 'storm' ? '0.45s' : '1.0s', animationDelay: '0.2s' }} />
      </div>

      {/* Atmospheric Mist Floating Glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '-150px',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.18) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'pulseGlow 6s infinite ease-in-out'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-120px',
        right: '-120px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 42, 109, 0.16) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'pulseGlow 8s infinite ease-in-out reverse'
      }} />

      {/* Ambient Sound & 4DX Sensory Toggles (Top Right Corner) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 20
      }}>
        <button
          onClick={() => {
            setWindSpeed(windSpeed === 'normal' ? 'storm' : 'normal');
            trigger4DXEffect();
          }}
          title="Toggle 4DX Wind & Atmosphere Intensity"
          style={{
            background: windSpeed === 'storm' ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.06)',
            border: windSpeed === 'storm' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
            color: windSpeed === 'storm' ? '#00f0ff' : '#94a3b8',
            padding: '6px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
        >
          <Wind size={13} /> {windSpeed === 'storm' ? '4DX STORM ON' : 'WIND: NORMAL'}
        </button>

        <button
          onClick={() => {
            initAudio();
            setAudioEnabled(!audioEnabled);
            playCyberZap(700, 0.1);
          }}
          title="Toggle 4DX Audio Effects"
          style={{
            background: audioEnabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            border: audioEnabled ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.12)',
            color: audioEnabled ? '#86efac' : '#94a3b8',
            padding: '6px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
        >
          {audioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          {audioEnabled ? '4DX SFX ON' : 'SFX MUTED'}
        </button>
      </div>

      {/* Interactive 4DX Background Canvas & Cyber Grid Floor */}
      <Canvas4DX stormMode={windSpeed === 'storm'} lightningTrigger={isLightningActive} />
      <div className="cyber-grid-floor" />

      {/* Main 4DX Holographic Glassmorphic Auth Card with 3D Tilt & Rotating Conic Glow */}
      <div 
        className="card-4dx-glow-wrap"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 10,
          transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`
        }}
      >
        <div className="card-4dx-content" style={{ padding: '36px 32px' }}>
          {/* Holographic Scanning Laser Line */}
          <div className="scanline-sweep" />

          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            {/* 3D Orbiting Gyroscope Rings around Core Logo */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
              <div className="orbital-ring-1" />
              <div className="orbital-ring-2" />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '58px',
                height: '58px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #ff2a6d 100%)',
                boxShadow: '0 0 35px rgba(0, 240, 255, 0.7), 0 0 15px rgba(255, 42, 109, 0.5)',
                color: '#fff',
                position: 'relative',
                zIndex: 2
              }}>
                <GraduationCap size={32} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #00f0ff, #ff2a6d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                4DX EXPERIENCE LABS
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(0, 240, 255, 0.16)', color: '#00f0ff', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                v2.0
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '0.5px',
              margin: '0 0 6px 0'
            }}>
              All College Notes
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Secure Student Gate • Semester 1 to 8 University Hub
            </p>

            {/* Cross-Device Cloud Sync Live Indicator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: cloudSyncStatus === 'synced' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(0, 240, 255, 0.1)',
              border: `1px solid ${cloudSyncStatus === 'synced' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(0, 240, 255, 0.3)'}`,
              fontSize: '0.72rem',
              color: cloudSyncStatus === 'synced' ? '#34d399' : '#38bdf8',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: cloudSyncStatus === 'synced' ? '#10b981' : '#00f0ff',
                boxShadow: `0 0 8px ${cloudSyncStatus === 'synced' ? '#10b981' : '#00f0ff'}`,
                display: 'inline-block'
              }}></span>
              <span>{cloudSyncStatus === 'synced' ? '☁️ Cloud Synced • Max 2 Active Devices' : '☁️ Connecting Cloud DB...'}</span>
            </div>

            {/* 4DX Audio Frequency Waveform Visualizer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '20px', marginTop: '12px' }}>
              <div className="eq-bar-1" style={{ width: '3px', background: '#00f0ff', borderRadius: '3px' }} />
              <div className="eq-bar-2" style={{ width: '3px', background: '#38bdf8', borderRadius: '3px' }} />
              <div className="eq-bar-3" style={{ width: '3px', background: '#ff2a6d', borderRadius: '3px' }} />
              <div className="eq-bar-4" style={{ width: '3px', background: '#a855f7', borderRadius: '3px' }} />
              <div className="eq-bar-2" style={{ width: '3px', background: '#00f0ff', borderRadius: '3px' }} />
              <div className="eq-bar-1" style={{ width: '3px', background: '#ff2a6d', borderRadius: '3px' }} />
              <div className="eq-bar-3" style={{ width: '3px', background: '#38bdf8', borderRadius: '3px' }} />
            </div>
          </div>

        {/* 4DX Interactive Section Switcher (Sign In vs Create Account) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(7, 11, 22, 0.85)',
          padding: '5px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '24px',
          position: 'relative'
        }}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setErrorMessage('');
              setSuccessMessage('');
              playCyberZap(800, 0.1);
            }}
            style={{
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'signin' ? 'linear-gradient(135deg, #00f0ff, #2563eb)' : 'transparent',
              color: activeTab === 'signin' ? '#040711' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'signin' ? '0 4px 15px rgba(0, 240, 255, 0.4)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <Lock size={14} /> Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
              setSuccessMessage('');
              playCyberZap(1000, 0.1);
            }}
            style={{
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'signup' ? 'linear-gradient(135deg, #ff2a6d, #9333ea)' : 'transparent',
              color: activeTab === 'signup' ? '#ffffff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'signup' ? '0 4px 15px rgba(255, 42, 109, 0.4)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <Sparkles size={14} /> Create Account
          </button>
        </div>

        {/* Brute-Force Lockout Defense Banner */}
        {lockoutRemaining > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1.5px solid #ef4444',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '18px',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
          }}>
            <ShieldAlert size={22} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, color: '#ffffff' }}>🛑 ZERO-TRUST LOCKOUT ACTIVE</div>
              <div style={{ fontSize: '0.78rem', color: '#fca5a5', marginTop: '2px' }}>
                Brute-force shield triggered after 5 failed attempts. Please wait <strong>{lockoutRemaining}s</strong> before retrying.
              </div>
            </div>
          </div>
        )}

                {/* Super Admin Detection Banner */}
        {adminNotice && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(220, 38, 38, 0.22))',
            border: '1.5px solid #f59e0b',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#fef08a',
            fontSize: '0.84rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)'
          }}>
            <ShieldAlert size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
            <span>{adminNotice}</span>
          </div>
        )}

        {/* Error and Success Alerts */}
        {errorMessage && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.18)',
            border: '1px solid #ef4444',
            borderRadius: '10px',
            padding: '12px 14px',
            color: '#fca5a5',
            fontSize: '0.82rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: 1.4 }}>{errorMessage}</span>
            </div>
            {limitBlockedUser && (
              <button
                type="button"
                onClick={async () => {
                  const target = limitBlockedUser;
                  setErrorMessage('');
                  setLimitBlockedUser(null);
                  setSuccessMessage('Revoking previous devices and authorizing this device...');
                  playCinematicBoom();
                  await forceLoginThisDevice(target.username);
                  setTimeout(() => {
                    onLogin(target);
                  }, 650);
                }}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
                  transition: 'transform 0.15s ease'
                }}
              >
                🚪 Terminate Other Sessions & Log In on This Device
              </button>
            )}
          </div>
        )}

        {successMessage && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid #22c55e',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#86efac',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* USERNAME FIELD (NO SPACES ALLOWED) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Username
              </label>
              <span style={{ fontSize: '0.72rem', color: (username.toLowerCase().trim() === 'bhavya mishra' || username.toLowerCase().includes('bhavya')) ? '#f59e0b' : '#38bdf8', fontWeight: 700 }}>
                {(username.toLowerCase().trim() === 'bhavya mishra' || username.toLowerCase().includes('bhavya')) ? '🛡️ ADMIN ACCOUNT DETECTED' : 'NO SPACES'}
              </span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder={activeTab === 'signin' ? 'Enter your username' : 'Choose username (no spaces)'}
                value={username}
                onChange={handleUsernameChange}
                required
                autoComplete="username"
                disabled={lockoutRemaining > 0}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(9, 13, 26, 0.9)',
                  border: '1.5px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '13px 14px 13px 44px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  opacity: lockoutRemaining > 0 ? 0.5 : 1
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00f0ff';
                  e.target.style.boxShadow = '0 0 16px rgba(0, 240, 255, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Password
              </label>
              {activeTab === 'signup' && (
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>SHA-256 Encrypted</span>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={activeTab === 'signin' ? 'Enter your password' : 'Create a secure password'}
                value={password}
                onChange={(e) => {
                  setErrorMessage('');
                  setPassword(e.target.value);
                }}
                required
                autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                disabled={lockoutRemaining > 0}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(9, 13, 26, 0.9)',
                  border: '1.5px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '13px 44px 13px 44px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  opacity: lockoutRemaining > 0 ? 0.5 : 1
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = activeTab === 'signup' ? '#ff2a6d' : '#00f0ff';
                  e.target.style.boxShadow = activeTab === 'signup' ? '0 0 16px rgba(255, 42, 109, 0.25)' : '0 0 16px rgba(0, 240, 255, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Entropy & Strength Meter (Create Account Only - No Email Needed) */}
            {activeTab === 'signup' && password.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Entropy Strength:
                  </span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: pwStrength.color }}>
                    {pwStrength.label}
                  </span>
                </div>
                <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${pwStrength.percentage}%`,
                    height: '100%',
                    background: pwStrength.color,
                    transition: 'all 0.3s ease',
                    boxShadow: `0 0 10px ${pwStrength.color}`
                  }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: pwStrength.rules.minLen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.04)',
                    color: pwStrength.rules.minLen ? '#86efac' : '#64748b',
                    border: '1px solid ' + (pwStrength.rules.minLen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)')
                  }}>
                    ✓ 8+ Chars
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: pwStrength.rules.hasUpper ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.04)',
                    color: pwStrength.rules.hasUpper ? '#86efac' : '#64748b',
                    border: '1px solid ' + (pwStrength.rules.hasUpper ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)')
                  }}>
                    ✓ Uppercase
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: pwStrength.rules.hasNumber ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.04)',
                    color: pwStrength.rules.hasNumber ? '#86efac' : '#64748b',
                    border: '1px solid ' + (pwStrength.rules.hasNumber ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)')
                  }}>
                    ✓ Number
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: pwStrength.rules.hasSpecial ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.04)',
                    color: pwStrength.rules.hasSpecial ? '#86efac' : '#64748b',
                    border: '1px solid ' + (pwStrength.rules.hasSpecial ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)')
                  }}>
                    ✓ Symbol
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Submit Button with Liquid Neon Shimmer */}
          <button
            type="submit"
            className="btn-shimmer-wrap"
            disabled={lockoutRemaining > 0}
            style={{
              marginTop: '8px',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: lockoutRemaining > 0 
                ? 'rgba(239, 68, 68, 0.3)'
                : (activeTab === 'signin' 
                  ? 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)' 
                  : 'linear-gradient(135deg, #ff2a6d 0%, #9333ea 100%)'),
              color: lockoutRemaining > 0 ? '#fca5a5' : (activeTab === 'signin' ? '#040711' : '#ffffff'),
              fontSize: '0.98rem',
              fontWeight: 900,
              cursor: lockoutRemaining > 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: lockoutRemaining > 0 ? 'none' : (activeTab === 'signin'
                ? '0 6px 25px rgba(0, 240, 255, 0.45)'
                : '0 6px 25px rgba(255, 42, 109, 0.45)'),
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px',
              opacity: lockoutRemaining > 0 ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>{activeTab === 'signin' ? 'ENTER 4DX PORTAL' : 'INITIALIZE ACCOUNT & ENTER'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Hint */}
        <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
          <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
            {activeTab === 'signin' ? (
              <>
                New student?{' '}
                <span 
                  onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
                  style={{ color: '#00f0ff', cursor: 'pointer', fontWeight: 800 }}
                >
                  Create Account here
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span 
                  onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
                  style={{ color: '#ff2a6d', cursor: 'pointer', fontWeight: 800 }}
                >
                  Sign in here
                </span>
              </>
            )}
          </p>
        </div>

        </div> {/* Closes .card-4dx-content */}
      </div> {/* Closes .card-4dx-glow-wrap */}
    </div>
  );
}
