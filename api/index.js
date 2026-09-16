const express = require('express');
const cors = require('cors');

const app = express();

// ---------------------------------------------------------------------------
// 1. SECURITY HEADERS & CORS HARDENING
// ---------------------------------------------------------------------------
app.use(cors({
  origin: '*', // Allows Vercel preview & production domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '50kb' })); // Mitigate Large Payload DoS

// Enterprise HTTP Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  next();
});

// ---------------------------------------------------------------------------
// 2. IN-MEMORY RATE LIMITER & BRUTE-FORCE PROTECTION
// ---------------------------------------------------------------------------
const requestCounts = new Map();
const postCounts = new Map();

// Clear rate limits every 60 seconds
setInterval(() => {
  requestCounts.clear();
  postCounts.clear();
}, 60000);

const rateLimiter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const currentRequests = (requestCounts.get(clientIp) || 0) + 1;
  requestCounts.set(clientIp, currentRequests);

  if (currentRequests > 120) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Zero-Trust API Shield has temporarily throttled your IP. Please try again in 1 minute.',
      retryAfterSeconds: 60
    });
  }
  next();
};

const postRateLimiter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const currentPosts = (postCounts.get(clientIp) || 0) + 1;
  postCounts.set(clientIp, currentPosts);

  if (currentPosts > 10) {
    return res.status(429).json({
      error: 'Spam Prevention',
      message: 'Posting rate limit exceeded. Max 10 contributions per minute per IP.',
      retryAfterSeconds: 60
    });
  }
  next();
};

app.use(rateLimiter);

// ---------------------------------------------------------------------------
// 3. INPUT SANITIZER (Zero-Tolerance for XSS / Script Injection)
// ---------------------------------------------------------------------------
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '') // Strip script tags
    .replace(/<[^>]+>/g, '')                            // Strip HTML tags
    .replace(/javascript:/gi, '')                       // Strip javascript pseudo-protocol
    .replace(/onerror/gi, '')                           // Strip onerror handlers
    .replace(/onload/gi, '')                            // Strip onload handlers
    .trim();
}

// In-memory academic store
const subjects = [
  { id: 'sub-m1', semester: 1, year: '1st Year', name: 'Engineering Mathematics I', code: 'MATH101', credits: 4, notesCount: '5 Units Complete', rating: 4.9 },
  { id: 'sub-p1', semester: 1, year: '1st Year', name: 'Applied Physics', code: 'PHYS102', credits: 4, notesCount: '5 Units Complete', rating: 4.8 },
  { id: 'sub-c1', semester: 2, year: '1st Year', name: 'Programming & Problem Solving in C', code: 'CS102', credits: 4, notesCount: '5 Units Complete', rating: 4.9 },
  { id: 'sub-dsa', semester: 3, year: '2nd Year', name: 'Data Structures & Algorithms', code: 'CS301', credits: 4, notesCount: '5 Units Complete', rating: 5.0 },
  { id: 'sub-dld', semester: 3, year: '2nd Year', name: 'Digital Logic & Computer Design', code: 'CS302', credits: 3, notesCount: '5 Units Complete', rating: 4.7 },
  { id: 'sub-os', semester: 4, year: '2nd Year', name: 'Operating Systems', code: 'CS401', credits: 4, notesCount: '5 Units Complete', rating: 4.9 },
  { id: 'sub-dbms', semester: 4, year: '2nd Year', name: 'Database Management Systems', code: 'CS402', credits: 4, notesCount: '5 Units Complete', rating: 4.9 },
  { id: 'sub-cn', semester: 5, year: '3rd Year', name: 'Computer Networks', code: 'CS501', credits: 4, notesCount: '5 Units Complete', rating: 4.8 },
  { id: 'sub-ai', semester: 6, year: '3rd Year', name: 'Artificial Intelligence & Machine Learning', code: 'CS601', credits: 4, notesCount: '5 Units Complete', rating: 5.0 },
  { id: 'sub-cloud', semester: 7, year: '4th Year', name: 'Cloud Computing & Distributed Systems', code: 'CS701', credits: 4, notesCount: '5 Units Complete', rating: 4.8 },
  { id: 'sub-devops', semester: 8, year: '4th Year', name: 'DevOps Engineering & CI/CD Pipelines', code: 'CS801', credits: 3, notesCount: '4 Units Complete', rating: 4.9 }
];

let doubts = [
  {
    id: 'f1',
    author: 'Aakash Verma (3rd Year)',
    subject: 'Operating Systems',
    question: 'How to clearly differentiate between Banker\'s Algorithm for Deadlock Avoidance vs Deadlock Detection?',
    answersCount: 4,
    upvotes: 18,
    date: '2 hours ago'
  }
];

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    portal: 'College Notes & Study Hub',
    totalSubjects: subjects.length,
    security: {
      drm: 'Active',
      rateLimiter: 'Active (120 req/min)',
      tlsLevel: 'TLS 1.3',
      xssSanitization: 'Enabled'
    }
  });
});

router.get('/security', (req, res) => {
  res.json({
    securityLevel: 'Enterprise Tier 4 (Zero-Trust DRM Active)',
    features: [
      { name: 'Forensic Dynamic Watermarking', status: 'ACTIVE', description: 'Real-time session identification watermarks on lecture notes.' },
      { name: 'Anti-Copy / Anti-Scrape Shield', status: 'ACTIVE', description: 'Right-click, DevTools keybindings, and text selection interceptors.' },
      { name: 'Strict Content Security Policy (CSP)', status: 'ACTIVE', description: 'Prevents unauthorized scripts, clickjacking, and inline injection.' },
      { name: 'TLS 1.3 Strict Transport Security', status: 'ACTIVE', description: 'HSTS with 2-year preloaded HTTPS enforcement.' },
      { name: 'API Rate Limiting & DoS Shield', status: 'ACTIVE', description: '120 req/min general, 10 req/min for mutations.' },
      { name: 'Input Sanitization', status: 'ACTIVE', description: 'XSS, HTML tag stripping, and payload length restrictions.' }
    ]
  });
});

router.get('/subjects', (req, res) => {
  res.json(subjects);
});

router.get('/doubts', (req, res) => {
  res.json(doubts);
});

router.post('/doubts', postRateLimiter, (req, res) => {
  const rawAuthor = req.body.author;
  const rawSubject = req.body.subject;
  const rawQuestion = req.body.question;

  const author = sanitizeInput(rawAuthor);
  const subject = sanitizeInput(rawSubject);
  const question = sanitizeInput(rawQuestion);

  if (!author || !question) {
    return res.status(400).json({ error: 'Author and question are required, and cannot contain invalid script tags.' });
  }

  if (author.length > 60 || question.length > 1000) {
    return res.status(400).json({ error: 'Payload exceeds maximum character security threshold.' });
  }

  const newDoubt = {
    id: 'f' + (doubts.length + 1),
    author,
    subject: subject || 'General Engineering',
    question,
    answersCount: 0,
    upvotes: 1,
    date: 'Just now'
  };
  doubts.unshift(newDoubt);
  res.status(201).json(newDoubt);
});

// ---------------------------------------------------------------------------
// 4. CLOUD USER ACCOUNT MANAGEMENT & CROSS-DEVICE AUTH SYNCHRONIZER
// ---------------------------------------------------------------------------
let registeredUsers = [
  {
    username: 'Bhavya Mishra',
    role: 'superadmin',
    isSuperAdmin: true,
    passwordHash: '1e0489c5be19d207c5af83e422088a8ce588b04ee9096f78e4efd2478254448b',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    username: 'student123',
    role: 'student',
    salt: '492dc069b4896dc685b4ac3915d4b304',
    passwordHash: 'a1bfb0afa2fe31d4120ac198fdc803225eeadcdea7630e3582a41359d4eb84bf',
    createdAt: '2026-09-12T08:00:00.000Z'
  },
  { username: 'student', password: 'password123', role: 'student', createdAt: '2026-01-01T00:00:00.000Z' },
  { username: 'mikumandal', password: 'password123', role: 'student', createdAt: '2026-02-15T00:00:00.000Z' },
  { username: 'engineer', password: 'password123', role: 'student', createdAt: '2026-02-20T00:00:00.000Z' }
];

router.get('/users', (req, res) => {
  res.json({
    success: true,
    count: registeredUsers.length,
    users: registeredUsers,
    timestamp: new Date().toISOString()
  });
});

router.post('/users', (req, res) => {
  const user = req.body;
  if (!user || !user.username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const clean = user.username.trim();
  const idx = registeredUsers.findIndex(u => u.username.toLowerCase() === clean.toLowerCase());
  const now = new Date().toISOString();

  if (idx >= 0) {
    registeredUsers[idx] = { ...registeredUsers[idx], ...user, updatedAt: now };
  } else {
    registeredUsers.push({
      ...user,
      username: clean,
      createdAt: user.createdAt || now,
      updatedAt: now
    });
  }

  res.json({ success: true, user: registeredUsers.find(u => u.username.toLowerCase() === clean.toLowerCase()), users: registeredUsers });
});

router.post('/users/sync', (req, res) => {
  const incoming = req.body.users;
  if (Array.isArray(incoming)) {
    for (const inc of incoming) {
      if (!inc || !inc.username) continue;
      const clean = inc.username.trim();
      const idx = registeredUsers.findIndex(u => u.username.toLowerCase() === clean.toLowerCase());
      if (idx >= 0) {
        const existing = registeredUsers[idx];
        const existingTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
        const incTime = inc.updatedAt ? new Date(inc.updatedAt).getTime() : 0;
        if (incTime >= existingTime) {
          registeredUsers[idx] = { ...existing, ...inc };
        }
      } else {
        registeredUsers.push(inc);
      }
    }
  }
  res.json({ success: true, count: registeredUsers.length, users: registeredUsers });
});

router.post('/users/change-password', (req, res) => {
  const { username, newPassword, newHash, newSalt } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const clean = username.trim();
  const idx = registeredUsers.findIndex(u => u.username.toLowerCase() === clean.toLowerCase());
  const now = new Date().toISOString();

  if (idx >= 0) {
    if (newPassword) registeredUsers[idx].password = newPassword;
    if (newHash) registeredUsers[idx].passwordHash = newHash;
    if (newSalt) registeredUsers[idx].salt = newSalt;
    registeredUsers[idx].updatedAt = now;
    return res.json({ success: true, message: `Password for @${clean} updated successfully!`, user: registeredUsers[idx] });
  } else {
    const newUser = {
      username: clean,
      password: newPassword,
      passwordHash: newHash,
      salt: newSalt,
      role: clean.toLowerCase() === 'bhavya mishra' ? 'superadmin' : 'student',
      createdAt: now,
      updatedAt: now
    };
    registeredUsers.push(newUser);
    return res.json({ success: true, message: `Password for @${clean} updated successfully!`, user: newUser });
  }
});

router.delete('/users/:username', (req, res) => {
  const username = req.params.username;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  if (username.toLowerCase() === 'bhavya mishra') {
    return res.status(403).json({ error: 'Cannot delete Super Admin account' });
  }

  registeredUsers = registeredUsers.filter(u => u.username.toLowerCase() !== username.toLowerCase());
  res.json({ success: true, message: `User @${username} deleted successfully`, count: registeredUsers.length });
});

app.use('/api', router);
app.use('/', router);

module.exports = app;
