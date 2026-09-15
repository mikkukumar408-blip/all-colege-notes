const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory data store
const movies = [
  {
    id: 'm1',
    title: 'Cyberpunk Odyssey 2088',
    genre: 'Sci-Fi / High-Octane Action',
    duration: '148 min',
    rating: 'PG-13',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    description: 'A neon-drenched hyper-speed pursuit through orbit. Fully synchronized with high-intensity hydraulic seat thrusts, simulated warp-speed sonic wind blasts, and ozone scent bursts.',
    fxProfile: {
      motionIntensity: 95,
      windSpeed: 'High (60 km/h)',
      waterEffects: 'Moderate Mist',
      environmental: ['Strobe Lightning', 'Low Smoke', 'Gunpowder Scent']
    },
    showtimes: ['12:30 PM', '03:45 PM', '07:15 PM', '10:30 PM']
  },
  {
    id: 'm2',
    title: 'Apex Storm: Deep Abyss',
    genre: 'Thriller / Natural Disaster',
    duration: '132 min',
    rating: 'PG-13',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    description: 'Catastrophic Category 5 oceanic tempest. Experience torrential rain simulation, ocean mist blasts, floor air ticklers, and 3-axis violent wave pitches.',
    fxProfile: {
      motionIntensity: 90,
      windSpeed: 'Gale Force (75 km/h)',
      waterEffects: 'Heavy Rain & Mist',
      environmental: ['Water Cannon', 'Thunder Strobe', 'Ocean Breeze Scent']
    },
    showtimes: ['01:15 PM', '04:30 PM', '08:00 PM', '11:15 PM']
  },
  {
    id: 'm3',
    title: 'Velocity Rift: Hyper Drift',
    genre: 'Racing / Extreme Sports',
    duration: '124 min',
    rating: 'PG-13',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80',
    description: 'Drift across razor sharp mountain hairpins. Experience precision chassis shudder, asphalt vibration rumblers, turbo air jet streams, and burning rubber scent bursts.',
    fxProfile: {
      motionIntensity: 88,
      windSpeed: 'Turbo Blasts',
      waterEffects: 'Light Puddle Splashes',
      environmental: ['Tire Smoke', 'Warm Air Jet', 'Motor Oil Scent']
    },
    showtimes: ['11:00 AM', '02:15 PM', '05:45 PM', '09:00 PM']
  },
  {
    id: 'm4',
    title: 'Frostbound: The Polar Breach',
    genre: 'Adventure / Survival',
    duration: '139 min',
    rating: 'PG',
    releaseDate: 'Coming Soon',
    poster: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1600&q=80',
    description: 'An expedition into unmapped sub-zero caverns. Features real falling auditorium snow, freezing ambient wind drafts, ice-crack seat drops, and blizzard fog.',
    fxProfile: {
      motionIntensity: 82,
      windSpeed: 'Sub-Zero Breeze',
      waterEffects: 'Snow & Frost Mist',
      environmental: ['Real Auditorium Snow', 'Dense White Fog', 'Pine Frost Scent']
    },
    showtimes: ['Coming Friday']
  }
];

const effects = [
  {
    id: 'heave-pitch-roll',
    title: '3-DOF Motion Base',
    category: 'Motion & Dynamics',
    icon: 'Navigation',
    description: 'Patented 3-degree-of-freedom actuators that simulate pitch (tilt forward/back), roll (tilt side-to-side), and heave (vertical lift and drop) synchronized to the microsecond.',
    hardwareSpecs: 'High-speed servo actuators, 600kg lift capacity, sub-millisecond response delay'
  },
  {
    id: 'wind-gale',
    title: 'Turbine Wind Generators',
    category: 'Environmental Atmospheric',
    icon: 'Wind',
    description: 'High-velocity overhead and frontal fans reproducing howling storms, skydiving freefall, and gentle scenic zephyrs.',
    hardwareSpecs: 'Ducted silent turbine blowers, dynamic RPM control up to 80 km/h'
  },
  {
    id: 'water-mist',
    title: 'Micro-Mist & Water Shot',
    category: 'Sensory Liquid',
    icon: 'Droplets',
    description: 'Face-level fine water aerosol and ceiling rain sprinklers. Cinema-goers can toggle this effect ON or OFF directly from their armrest control panel.',
    hardwareSpecs: 'Sterile high-pressure atomizers, individual armrest on/off valves'
  },
  {
    id: 'lightning-strobe',
    title: 'Auditorium Strobe Lightning',
    category: 'Visual Immersion',
    icon: 'Zap',
    description: 'Industrial studio flash arrays mounted across the ceiling perimeter recreating explosive lightning strikes, EMP discharges, and sci-fi lasers.',
    hardwareSpecs: '12,000 Lumen multi-channel strobe arrays, 360° panoramic flash'
  },
  {
    id: 'fog-smoke',
    title: 'Dense Fog & Low Smoke',
    category: 'Environmental Atmospheric',
    icon: 'CloudFog',
    description: 'Rapid-dissipating organic aerosol that carpets the front stage and aisles, drawing the viewer directly onto the battleground or misty dock.',
    hardwareSpecs: 'Water-based non-toxic fog chillers, rapid dissipation air purifiers'
  },
  {
    id: 'scent-burst',
    title: 'Multi-Chamber Olfactory Scent',
    category: 'Sensory Aroma',
    icon: 'Sparkles',
    description: 'Instant aromatic releases featuring over 20 tailored cinema scents including Ocean Breeze, Gunpowder, Burning Rubber, Fresh Pine, Coffee, and Floral Meadows.',
    hardwareSpecs: 'Aerosol precision nozzles with carbon scrubber exhaust'
  },
  {
    id: 'back-ticklers',
    title: 'Back Shakers & Leg Ticklers',
    category: 'Tactile Haptics',
    icon: 'Activity',
    description: 'Sub-bass transducers inside seat cushions deliver chest-pounding impact shudders, while rubber whips simulate swarming critters or rustling underbrush.',
    hardwareSpecs: 'Dual 50W tactile bass rumblers + motorized sweep whiskers'
  }
];

const theaters = [
  {
    id: 't1',
    name: 'Metropolis 4DX Ultra-Plex',
    city: 'Downtown Metro',
    address: '450 Cinema Boulevard, Floor 4',
    screenSize: '24m x 11m Curved Silver Screen',
    audioFormat: 'Dolby Atmos 64-Channel + 4DX Transducers',
    totalSeats: 120,
    features: ['Heated 4DX Motion Seats', 'Auditorium Snow', 'Scent Diffusion', 'Water Shield Armrests']
  },
  {
    id: 't2',
    name: 'Starlight Prime 4DX Pavilion',
    city: 'Westside Grand Mall',
    address: '1000 Galleria Way, Gate 2',
    screenSize: '20m x 9m Laser Projection',
    audioFormat: 'DTS:X Immersive Audio',
    totalSeats: 96,
    features: ['3-DOF Motion Seats', 'Gale Turbine Fans', 'Laser Fog', 'Armrest ON/OFF Water Toggle']
  },
  {
    id: 't3',
    name: 'CyberDome 4DX Arena',
    city: 'East Harbor District',
    address: '88 Waterfront Pier, Terminal B',
    screenSize: '22m x 10m Dual Christie RGB Laser',
    audioFormat: 'Dolby Atmos Surround',
    totalSeats: 112,
    features: ['Dynamic Rain Curtains', 'Dual Strobe Rigs', 'Extreme Heave Pistons', 'VIP Recliners']
  }
];

let reviews = [
  {
    id: 'r1',
    userName: 'Elena Rostova',
    movieTitle: 'Cyberpunk Odyssey 2088',
    rating: 5,
    effectScore: 98,
    date: 'Yesterday',
    comment: 'The warp-drive acceleration slammed me back into the seat with such force! The wind tunnels in the ceiling make you feel like you are literally flying through the stratosphere.'
  },
  {
    id: 'r2',
    userName: 'Marcus Vance',
    movieTitle: 'Apex Storm: Deep Abyss',
    rating: 5,
    effectScore: 95,
    date: '2 days ago',
    comment: 'Brilliant use of the rain spray and lightning. It felt 10x more thrilling than standard IMAX. Turn your armrest water switch on for maximum authenticity!'
  },
  {
    id: 'r3',
    userName: 'Sophia Lin',
    movieTitle: 'Velocity Rift: Hyper Drift',
    rating: 4.8,
    effectScore: 92,
    date: '3 days ago',
    comment: 'The burning rubber scent combined with the aggressive seat tilt around tight hairpins had our entire row cheering. Absolutely mind-blowing.'
  }
];

let bookings = [];

// API Endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    version: '2.0.4DX',
    cinemaName: 'HyperSensory 4DX Cinema Network',
    activeSensors: 42
  });
});

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/effects', (req, res) => {
  res.json(effects);
});

app.get('/api/theaters', (req, res) => {
  res.json(theaters);
});

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const { userName, movieTitle, rating, effectScore, comment } = req.body;
  if (!userName || !movieTitle || !comment) {
    return res.status(400).json({ error: 'Missing required review fields' });
  }
  const newReview = {
    id: 'r' + (reviews.length + 1),
    userName,
    movieTitle,
    rating: Number(rating) || 5,
    effectScore: Number(effectScore) || 90,
    date: 'Just now',
    comment
  };
  reviews.unshift(newReview);
  res.status(201).json(newReview);
});

app.post('/api/bookings', (req, res) => {
  const { movieId, theaterId, showtime, selectedSeats, customerName, customerEmail, waterEffectsEnabled } = req.body;
  if (!movieId || !selectedSeats || selectedSeats.length === 0) {
    return res.status(400).json({ error: 'Must specify movie and at least one seat' });
  }

  const bookingConfirmation = {
    bookingId: '4DX-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    movieId,
    theaterId,
    showtime,
    selectedSeats,
    customerName: customerName || 'Valued 4DX Cinema Guest',
    customerEmail: customerEmail || 'guest@4dxexperience.com',
    waterEffectsEnabled: waterEffectsEnabled ?? true,
    totalPrice: selectedSeats.length * 24.50,
    timestamp: new Date().toISOString()
  };

  bookings.push(bookingConfirmation);
  res.status(201).json(bookingConfirmation);
});

app.listen(PORT, () => {
  console.log(`4DX Backend Server running on http://localhost:${PORT}`);
});
