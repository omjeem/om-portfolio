import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const width = parseInt(searchParams.get('width') || '300');
  const height = parseInt(searchParams.get('height') || '300');
  const text = searchParams.get('text') || 'Placeholder';
  const color = searchParams.get('color') || 'CCCCCC';
  const textColor = searchParams.get('textColor') || '666666';

  // Sanitize input
  const sanitizedText = text.replace(/[^\w\s-]/g, '').substring(0, 50);
  const safeWidth = Math.min(Math.max(width, 1), 1200);
  const safeHeight = Math.min(Math.max(height, 1), 1200);

  const svg = `
    <svg width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${safeWidth}" height="${safeHeight}" fill="#${color}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(safeWidth, safeHeight) / 10}px" 
        fill="#${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${sanitizedText}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; script-src 'none'; style-src 'none'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
} 