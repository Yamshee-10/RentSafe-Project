const fs = require('fs');
const path = require('path');

// Create placeholder images using canvas-like approach
// Since we can't use canvas easily, let's create simple SVG images and convert to PNG

const svgImages = {
  'camera.jpg': `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF8E8E;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#grad1)"/>
  <circle cx="200" cy="150" r="80" fill="white" opacity="0.3"/>
  <circle cx="200" cy="150" r="60" fill="white" opacity="0.5"/>
  <rect x="160" y="120" width="80" height="60" rx="10" fill="white" opacity="0.7"/>
  <text x="200" y="280" text-anchor="middle" font-size="24" font-weight="bold" fill="white">📷 Camera</text>
</svg>
  `,
  'bike.jpg': `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4ECDC4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#44A08D;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#grad2)"/>
  <circle cx="100" cy="180" r="50" fill="none" stroke="white" stroke-width="8"/>
  <circle cx="300" cy="180" r="50" fill="none" stroke="white" stroke-width="8"/>
  <rect x="120" y="130" width="160" height="80" rx="10" fill="white" opacity="0.6"/>
  <line x1="200" y1="50" x2="200" y2="130" stroke="white" stroke-width="4"/>
  <text x="200" y="280" text-anchor="middle" font-size="24" font-weight="bold" fill="white">🚴 Bike</text>
</svg>
  `,
  'tent.jpg': `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F7971E;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFD200;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#grad3)"/>
  <polygon points="100,100 200,50 300,100 200,150" fill="white" opacity="0.8"/>
  <polygon points="120,120 200,80 280,120 200,160" fill="white" opacity="0.6"/>
  <line x1="200" y1="150" x2="150" y2="220" stroke="white" stroke-width="3"/>
  <line x1="200" y1="150" x2="250" y2="220" stroke="white" stroke-width="3"/>
  <text x="200" y="280" text-anchor="middle" font-size="24" font-weight="bold" fill="white">⛺ Tent</text>
</svg>
  `
};

Object.entries(svgImages).forEach(([filename, svgContent]) => {
  const filepath = path.join(__dirname, '../uploads', filename);
  // For now, just save as text with a note that it's a placeholder
  // In a real app, you'd convert SVG to actual image
  const note = `<!-- Placeholder image: ${filename} -->\n<!-- SVG content for preview -->\n${svgContent}`;
  fs.writeFileSync(filepath.replace('.jpg', '.svg'), svgContent);
  console.log(`✅ Created placeholder: ${filename}`);
});

console.log('✅ All placeholder images created!');
