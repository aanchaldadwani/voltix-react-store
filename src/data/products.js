// Product photos: Pexels (free to use). `img(path, width)` builds an optimised URL.
export const img = (path, w = 800) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`

export const PHOTOS = {
  hp1: '3394650/pexels-photo-3394650.jpeg',
  hp2: '210927/pexels-photo-210927.jpeg',
  bud1: '33797659/pexels-photo-33797659.jpeg',
  bud2: '16703782/pexels-photo-16703782.jpeg',
  w1: '5081914/pexels-photo-5081914.jpeg',
  w2: '31406895/pexels-photo-31406895.jpeg',
  sp1: '374110/pexels-photo-374110.jpeg',
  sp2: '9842750/pexels-photo-9842750.jpeg',
  ph1: '569062/pexels-photo-569062.png',
  ph2: '24181865/pexels-photo-24181865.jpeg',
  ph3: '3945672/pexels-photo-3945672.jpeg',
  tb1: '38639/mockup-psd-ipad-iphone-38639.jpeg',
  lp1: '22431331/pexels-photo-22431331.jpeg',
  lp2: '11129922/pexels-photo-11129922.jpeg',
  lp3: '4070215/pexels-photo-4070215.jpeg',
  kb1: '9020272/pexels-photo-9020272.jpeg',
  kb2: '7858742/pexels-photo-7858742.jpeg',
  ms1: '7151696/pexels-photo-7151696.jpeg',
  cam1: '32752599/pexels-photo-32752599.jpeg',
  cam2: '3733981/pexels-photo-3733981.jpeg',
  dr1: '6726590/pexels-photo-6726590.jpeg',
  dr2: '30758402/pexels-photo-30758402.jpeg',
  gc1: '7887636/pexels-photo-7887636.jpeg',
  vr1: '7561900/pexels-photo-7561900.jpeg',
  vr2: '8728562/pexels-photo-8728562.jpeg',
  fl3: '39630/ipad-samsung-music-play-39630.jpeg',
  fl5: '15977087/pexels-photo-15977087.jpeg',
  fl6: '32912404/pexels-photo-32912404.jpeg',
  fl7: '16247542/pexels-photo-16247542.jpeg',
  fl9: '8369211/pexels-photo-8369211.jpeg',
  kb5: '7862521/pexels-photo-7862521.jpeg',
  tb3: '25809238/pexels-photo-25809238.jpeg',
}

export const CATEGORIES = [
  { id: 'audio', name: 'Audio', blurb: 'Headphones, earbuds & speakers', photo: PHOTOS.hp1 },
  { id: 'wearables', name: 'Wearables', blurb: 'Smartwatches & fitness', photo: PHOTOS.w1 },
  { id: 'phones', name: 'Phones & Tablets', blurb: 'Flagships & everyday phones', photo: PHOTOS.ph2 },
  { id: 'computers', name: 'Laptops & PCs', blurb: 'Laptops, keyboards & mice', photo: PHOTOS.lp1 },
  { id: 'cameras', name: 'Cameras & Drones', blurb: 'Capture every moment', photo: PHOTOS.cam1 },
  { id: 'gaming', name: 'Gaming & VR', blurb: 'Controllers, VR & setups', photo: PHOTOS.vr2 },
]

export const BRANDS = ['Voltix', 'Sonora', 'Pulse', 'Novatech', 'Lumen', 'Orbit', 'Skyline']

const P = (o) => ({ colors: ['#0b0f19', '#e5e7eb'], stock: 24, isNew: false, ...o })

export const PRODUCTS = [
  P({ id: 1, slug: 'aura-anc-wireless-headphones', name: 'Aura ANC Wireless Headphones', brand: 'Sonora', category: 'audio', price: 149, oldPrice: 199, rating: 4.8, reviews: 312, photos: [PHOTOS.hp1, PHOTOS.hp2, PHOTOS.fl6], colors: ['#f3f4f6', '#0b0f19', '#3b5bfd'], badge: 'Best Seller',
    short: 'Active noise cancelling, 40-hour battery and studio-grade sound.',
    features: ['Hybrid active noise cancelling', '40 hours of battery life', 'USB-C fast charge (10 min = 5 hrs)', 'Multipoint Bluetooth 5.3'],
    specs: { Driver: '40 mm dynamic', Battery: 'Up to 40 hours', Charging: 'USB-C fast charge', Bluetooth: '5.3, multipoint', Weight: '250 g' } }),
  P({ id: 2, slug: 'studio-classic-headphones', name: 'Studio Classic Headphones', brand: 'Sonora', category: 'audio', price: 89, oldPrice: null, rating: 4.6, reviews: 184, photos: [PHOTOS.hp2, PHOTOS.hp1], colors: ['#6b4f3a', '#0b0f19'],
    short: 'Warm, detailed sound with soft leather ear cushions.',
    features: ['Hand-stitched leather cushions', 'Detachable 3.5 mm cable', 'Foldable design', 'In-line mic and controls'],
    specs: { Driver: '50 mm', Connection: 'Wired 3.5 mm', Impedance: '32 Ω', Weight: '280 g' } }),
  P({ id: 3, slug: 'nova-buds-pro', name: 'Nova Buds Pro', brand: 'Pulse', category: 'audio', price: 79, oldPrice: 109, rating: 4.7, reviews: 421, photos: [PHOTOS.bud1, PHOTOS.bud2], colors: ['#0b0f19', '#f3f4f6'], badge: 'Hot',
    short: 'True wireless earbuds with ANC and a pocket-size case.',
    features: ['Active noise cancelling', '8 h + 24 h with case', 'IPX5 sweat resistant', 'Touch controls'],
    specs: { Battery: '8 h (32 h with case)', Water: 'IPX5', Bluetooth: '5.3', Charging: 'USB-C & wireless' } }),
  P({ id: 4, slug: 'pulse-buds-air', name: 'Pulse Buds Air', brand: 'Pulse', category: 'audio', price: 49, oldPrice: 69, rating: 4.4, reviews: 208, photos: [PHOTOS.bud2, PHOTOS.bud1], colors: ['#4a7fb5', '#0b0f19'], isNew: true,
    short: 'Light, comfortable everyday earbuds with deep bass.',
    features: ['Bass boost mode', '30 h total playtime', 'Low-latency game mode', 'One-tap pairing'],
    specs: { Battery: '6 h (30 h with case)', Water: 'IPX4', Bluetooth: '5.2', Weight: '4.5 g per bud' } }),
  P({ id: 5, slug: 'boom-mini-bluetooth-speaker', name: 'Boom Mini Bluetooth Speaker', brand: 'Orbit', category: 'audio', price: 59, oldPrice: 79, rating: 4.5, reviews: 156, photos: [PHOTOS.sp1, PHOTOS.sp2], colors: ['#0b0f19', '#9ca3af'],
    short: 'Pocket-size speaker with big 360° sound.',
    features: ['360° sound', '12 h playtime', 'IP67 waterproof', 'Pair two for stereo'],
    specs: { Output: '10 W', Battery: '12 hours', Water: 'IP67', Bluetooth: '5.1' } }),
  P({ id: 6, slug: 'orbit-home-speaker', name: 'Orbit Home Smart Speaker', brand: 'Orbit', category: 'audio', price: 129, oldPrice: null, rating: 4.6, reviews: 97, photos: [PHOTOS.sp2, PHOTOS.sp1], colors: ['#d6c7b0', '#0b0f19'], isNew: true,
    short: 'Room-filling sound with voice assistant built in.',
    features: ['Voice assistant built in', 'Wi-Fi & Bluetooth', 'Multi-room audio', 'Fabric finish'],
    specs: { Output: '30 W', Connectivity: 'Wi-Fi 6, Bluetooth 5.2', Mics: '4 far-field', Size: '15 × 15 × 9 cm' } }),
  P({ id: 7, slug: 'volt-watch-series-5', name: 'Volt Watch Series 5', brand: 'Voltix', category: 'wearables', price: 249, oldPrice: 299, rating: 4.8, reviews: 268, photos: [PHOTOS.w1, PHOTOS.w2], colors: ['#0b0f19', '#e5e7eb', '#c8f135'], badge: 'Best Seller',
    short: 'Always-on AMOLED, GPS, heart-rate and 7-day battery.',
    features: ['1.9" always-on AMOLED', 'Built-in GPS', 'Heart-rate & SpO2', '7-day battery life'],
    specs: { Display: '1.9" AMOLED', Battery: 'Up to 7 days', Water: '5 ATM', Sensors: 'HR, SpO2, GPS' } }),
  P({ id: 8, slug: 'volt-watch-lite', name: 'Volt Watch Lite', brand: 'Voltix', category: 'wearables', price: 129, oldPrice: 159, rating: 4.5, reviews: 143, photos: [PHOTOS.w2, PHOTOS.w1], colors: ['#f9c5d1', '#0b0f19'],
    short: 'Light fitness watch with 100+ workout modes.',
    features: ['100+ workout modes', 'Sleep tracking', '10-day battery', 'Quick replies'],
    specs: { Display: '1.6" LCD', Battery: 'Up to 10 days', Water: '5 ATM', Weight: '28 g' } }),
  P({ id: 9, slug: 'nova-x-smartphone', name: 'Nova X Smartphone', brand: 'Novatech', category: 'phones', price: 699, oldPrice: 799, rating: 4.7, reviews: 389, photos: [PHOTOS.ph1, PHOTOS.ph3], colors: ['#0b0f19', '#e5e7eb'], badge: 'Hot',
    short: '6.7" 120 Hz display, 50 MP camera and all-day battery.',
    features: ['6.7" 120 Hz OLED', '50 MP triple camera', '5000 mAh battery', '256 GB storage'],
    specs: { Display: '6.7" OLED, 120 Hz', Camera: '50 + 12 + 10 MP', Battery: '5000 mAh', Storage: '256 GB' } }),
  P({ id: 10, slug: 'nova-s-series', name: 'Nova S Series 5G', brand: 'Novatech', category: 'phones', price: 549, oldPrice: null, rating: 4.6, reviews: 211, photos: [PHOTOS.ph2, PHOTOS.ph1], colors: ['#c7b8ea', '#0b0f19', '#e5e7eb'], isNew: true,
    short: 'Slim 5G phone with pro-grade night photos.',
    features: ['5G ready', 'Night mode camera', '45 W fast charging', 'Gorilla Glass back'],
    specs: { Display: '6.4" AMOLED', Camera: '64 MP main', Battery: '4500 mAh', Charging: '45 W' } }),
  P({ id: 11, slug: 'lumen-tab-11', name: 'Lumen Tab 11', brand: 'Lumen', category: 'phones', price: 399, oldPrice: 449, rating: 4.5, reviews: 132, photos: [PHOTOS.tb1, PHOTOS.fl3], colors: ['#9ca3af', '#0b0f19'],
    short: '11" tablet for work, study and streaming.',
    features: ['11" 2K display', 'Quad speakers', 'Stylus support', '12-hour battery'],
    specs: { Display: '11" 2K', Storage: '128 GB', Battery: '8000 mAh', Weight: '480 g' } }),
  P({ id: 12, slug: 'skyline-air-14-laptop', name: 'Skyline Air 14 Laptop', brand: 'Skyline', category: 'computers', price: 1099, oldPrice: 1249, rating: 4.8, reviews: 176, photos: [PHOTOS.lp1, PHOTOS.lp3], colors: ['#e5e7eb', '#0b0f19'], badge: 'Best Seller',
    short: 'Ultra-thin 14" laptop with 18-hour battery.',
    features: ['14" 2.8K display', '16 GB RAM, 512 GB SSD', '18-hour battery', '1.2 kg aluminium body'],
    specs: { Display: '14" 2.8K', Memory: '16 GB', Storage: '512 GB SSD', Weight: '1.2 kg' } }),
  P({ id: 13, slug: 'skyline-pro-16', name: 'Skyline Pro 16', brand: 'Skyline', category: 'computers', price: 1599, oldPrice: null, rating: 4.7, reviews: 88, photos: [PHOTOS.lp2, PHOTOS.lp3], colors: ['#9ca3af'], isNew: true,
    short: 'Powerful 16" laptop for creators and developers.',
    features: ['16" 120 Hz display', '32 GB RAM, 1 TB SSD', 'Dedicated graphics', 'Backlit keyboard'],
    specs: { Display: '16" 120 Hz', Memory: '32 GB', Storage: '1 TB SSD', Weight: '1.9 kg' } }),
  P({ id: 14, slug: 'volt-mechanical-keyboard', name: 'Volt Mechanical Keyboard', brand: 'Voltix', category: 'computers', price: 119, oldPrice: 139, rating: 4.7, reviews: 203, photos: [PHOTOS.kb1, PHOTOS.kb5], colors: ['#0b0f19', '#e5e7eb'],
    short: 'Hot-swappable switches with per-key RGB lighting.',
    features: ['Hot-swappable switches', 'Per-key RGB', 'Wireless & USB-C', 'Aluminium frame'],
    specs: { Layout: '75%', Switches: 'Tactile, hot-swap', Battery: '4000 mAh', Connection: '2.4 GHz, BT, USB-C' } }),
  P({ id: 15, slug: 'glide-wireless-mouse', name: 'Glide Wireless Mouse', brand: 'Voltix', category: 'computers', price: 39, oldPrice: 49, rating: 4.4, reviews: 119, photos: [PHOTOS.ms1, PHOTOS.lp3], colors: ['#0b0f19'],
    short: 'Silent clicks and a 70-day battery.',
    features: ['Silent clicks', 'Ergonomic shape', '70-day battery', 'Works on glass'],
    specs: { DPI: '400–4000', Battery: '70 days', Connection: 'USB receiver & BT', Weight: '85 g' } }),
  P({ id: 16, slug: 'retro-snap-camera', name: 'Retro Snap Camera', brand: 'Lumen', category: 'cameras', price: 289, oldPrice: 329, rating: 4.6, reviews: 92, photos: [PHOTOS.cam1, PHOTOS.cam2], colors: ['#5eead4', '#f9a8d4'], badge: 'Hot',
    short: 'Compact retro-style camera with 4K video.',
    features: ['20 MP sensor', '4K video', 'Flip screen', 'Wi-Fi photo transfer'],
    specs: { Sensor: '20 MP', Video: '4K 30 fps', Screen: '3" flip', Weight: '310 g' } }),
  P({ id: 17, slug: 'lumen-classic-camera-kit', name: 'Lumen Classic Camera Kit', brand: 'Lumen', category: 'cameras', price: 649, oldPrice: null, rating: 4.7, reviews: 64, photos: [PHOTOS.cam2, PHOTOS.cam1], colors: ['#0b0f19'],
    short: 'Mirrorless camera with two lenses for every shot.',
    features: ['24 MP mirrorless', '2 lenses included', 'In-body stabilisation', 'Weather sealed'],
    specs: { Sensor: '24 MP APS-C', Lenses: '18–55 mm & 50 mm', Video: '4K 60 fps', Weight: '450 g' } }),
  P({ id: 18, slug: 'skyline-mini-drone', name: 'Skyline Mini 4K Drone', brand: 'Skyline', category: 'cameras', price: 459, oldPrice: 549, rating: 4.8, reviews: 151, photos: [PHOTOS.dr1, PHOTOS.dr2], colors: ['#9ca3af'], badge: 'Best Seller',
    short: 'Under-250 g drone with 4K camera and 34-minute flights.',
    features: ['4K HDR camera', '34-minute flight time', 'Obstacle sensing', '10 km video range'],
    specs: { Camera: '4K HDR', Flight: '34 minutes', Range: '10 km', Weight: '249 g' } }),
  P({ id: 19, slug: 'pro-wireless-controller', name: 'Pro Wireless Controller', brand: 'Pulse', category: 'gaming', price: 69, oldPrice: 79, rating: 4.6, reviews: 245, photos: [PHOTOS.gc1], colors: ['#6b7b3a', '#0b0f19'],
    short: 'Responsive controller with haptics and 30-hour battery.',
    features: ['Haptic feedback', 'Hall-effect sticks', '30-hour battery', 'PC, console & mobile'],
    specs: { Battery: '30 hours', Connection: 'BT & USB-C', Weight: '220 g', Compatibility: 'PC, console, mobile' } }),
  P({ id: 20, slug: 'vision-vr-headset', name: 'Vision VR Headset', brand: 'Novatech', category: 'gaming', price: 399, oldPrice: 449, rating: 4.5, reviews: 117, photos: [PHOTOS.vr1, PHOTOS.vr2], colors: ['#e5e7eb'], isNew: true,
    short: 'All-in-one VR with crisp 4K+ display and hand tracking.',
    features: ['4K+ LCD display', 'Hand tracking', 'No PC needed', '128 GB storage'],
    specs: { Display: '4K+ LCD', Refresh: '120 Hz', Storage: '128 GB', Weight: '503 g' } }),
]

export const discount = (p) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0)
export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)
export const categoryName = (id) => CATEGORIES.find((c) => c.id === id)?.name ?? id

// Sample reviews (generated per product so every product page has reviews)
const NAMES = ['Ayesha K.', 'Daniel R.', 'Sara M.', 'Omar F.', 'Lucas P.', 'Hina A.', 'Emma W.', 'Bilal S.']
const TEXTS = [
  ['Worth every penny', 'Build quality is excellent and it arrived in two days. Exactly as described.'],
  ['Great value', 'Does everything I need. Battery life is even better than advertised.'],
  ['Very happy', 'Looks premium and works perfectly. Customer support answered all my questions.'],
  ['Good, small issue', 'Works well overall. The app could be easier to use, but the hardware is great.'],
  ['Highly recommend', 'Bought one for myself and one as a gift. Both of us love it.'],
]
export const reviewsFor = (p) =>
  [0, 1, 2].map((i) => {
    const t = TEXTS[(p.id + i) % TEXTS.length]
    return { id: `${p.id}-${i}`, name: NAMES[(p.id * 3 + i) % NAMES.length], rating: i === 2 && p.rating < 4.6 ? 4 : 5, title: t[0], text: t[1], date: `${(p.id + i * 7) % 27 + 1} Oct 2026`, verified: true }
  })
