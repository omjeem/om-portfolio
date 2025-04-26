const fs = require('fs');
const path = require('path');

// Get skills data to extract icon names
const skillsData = require('../data/skills.json');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Extract unique icon paths
const iconPaths = [...new Set(skillsData.map(skill => skill.icon))];

// Generate simple SVG for each icon
iconPaths.forEach(iconPath => {
  if (!iconPath) return;
  
  // Remove leading slash for filesystem path
  const pathWithoutLeadingSlash = iconPath.startsWith('/') ? iconPath.substring(1) : iconPath;
  
  // Get just the filename
  const iconName = path.basename(pathWithoutLeadingSlash);
  
  // Path in the public directory (without the /public prefix)
  const relativeOutputPath = path.dirname(pathWithoutLeadingSlash);
  
  // Make sure the directory exists
  const fullOutputDir = path.join(__dirname, '../public', relativeOutputPath);
  if (!fs.existsSync(fullOutputDir)) {
    fs.mkdirSync(fullOutputDir, { recursive: true });
  }
  
  const outputPath = path.join(fullOutputDir, iconName);
  
  // Skip if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Icon ${iconName} already exists. Skipping.`);
    return;
  }
  
  // Extract name without extension to use as label
  const label = iconName.replace('.svg', '');
  
  // Generate a color based on the name (simple hash to color)
  const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };
  
  const color = getColorFromString(label);
  
  // Create simple SVG placeholder
  const svgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}" />
    <text 
      x="50%" 
      y="50%" 
      font-family="Arial, sans-serif" 
      font-size="14" 
      fill="white" 
      text-anchor="middle" 
      dominant-baseline="middle"
    >
      ${label}
    </text>
  </svg>`;
  
  // Write SVG to file
  fs.writeFileSync(outputPath, svgContent);
  console.log(`Created icon: ${iconName} at ${relativeOutputPath}/${iconName}`);
});

console.log('Icon generation complete!'); 