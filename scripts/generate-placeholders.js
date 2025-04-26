const fs = require('fs');
const path = require('path');

// Ensure directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Projects images
const projectsDir = path.join(__dirname, '../public/images/projects');
ensureDirectoryExists(projectsDir);

// Define project images to create
const projectImages = [
  { name: 'portfolio.jpg', color: '0070F3', text: 'Portfolio' },
  { name: 'ecommerce.jpg', color: '6D28D9', text: 'E-Commerce' },
  { name: 'fitness.jpg', color: 'F97316', text: 'Fitness' },
  { name: 'chatbot.jpg', color: '10B981', text: 'AI Chatbot' }
];

// Create SVG content
const createSvgContent = (text, color, width = 600, height = 400) => {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#${color}" />
    <text 
      x="50%" 
      y="50%" 
      font-family="Arial, sans-serif" 
      font-size="${Math.min(width, height) / 10}px" 
      fill="white" 
      text-anchor="middle" 
      dominant-baseline="middle"
    >
      ${text}
    </text>
  </svg>`;
};

// Generate project images
projectImages.forEach(({ name, color, text }) => {
  const filePath = path.join(projectsDir, name);
  const svgContent = createSvgContent(text, color);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder: ${filePath}`);
});

console.log('Placeholder generation complete!'); 