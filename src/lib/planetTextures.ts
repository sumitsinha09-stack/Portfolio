import * as THREE from 'three';

// Simple pseudo-random hash function
function hash(x: number, y: number) {
  const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return h - Math.floor(h);
}

// 2D Value Noise
function noise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);

  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);

  return a * (1 - ux) * (1 - uy) +
         b * ux * (1 - uy) +
         c * (1 - ux) * uy +
         d * ux * uy;
}

// Fractional Brownian Motion (fBm) for organic details
function fbm(x: number, y: number, octaves = 4): number {
  let value = 0.0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

export function createMoonTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Generate base crater/rock noise texture
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const n = fbm(u * 20, v * 20, 5);
      const grey = Math.floor(n * 60 + 110);
      const idx = (y * width + x) * 4;
      data[idx] = grey;
      data[idx + 1] = grey;
      data[idx + 2] = grey;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Draw 3D craters procedurally
  const numCraters = 25;
  for (let i = 0; i < numCraters; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 12 + 4;
    
    ctx.beginPath();
    ctx.arc(cx - 1, cy - 1, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40, 40, 40, 0.4)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + 1, cy + 1, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230, 230, 230, 0.3)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 100, 100, 0.35)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      if (v < 0.12 || v > 0.88) {
        data[idx] = 240;
        data[idx + 1] = 245;
        data[idx + 2] = 250;
        data[idx + 3] = 255;
        continue;
      }

      const n = fbm(u * 8, v * 8, 5);
      
      if (n > 0.47) {
        const elev = (n - 0.47) / (1 - 0.47);
        const landN = noise(u * 30, v * 30);
        
        if (elev > 0.3) {
          data[idx] = Math.floor(120 + landN * 20);
          data[idx + 1] = Math.floor(100 + landN * 15);
          data[idx + 2] = Math.floor(80 + landN * 10);
        } else {
          data[idx] = Math.floor(40 + landN * 15);
          data[idx + 1] = Math.floor(100 + landN * 30);
          data[idx + 2] = Math.floor(45 + landN * 15);
        }
      } else {
        const depth = n / 0.47;
        data[idx] = Math.floor(10 + depth * 15);
        data[idx + 1] = Math.floor(25 + depth * 35);
        data[idx + 2] = Math.floor(65 + depth * 55);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createEarthCloudsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      const n = fbm(u * 5, v * 5, 4);
      if (n > 0.44) {
        const alpha = Math.floor(Math.min(1, (n - 0.44) * 2.2) * 240);
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = alpha;
      } else {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createMarsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      if (v < 0.08 || v > 0.92) {
        data[idx] = 235;
        data[idx + 1] = 215;
        data[idx + 2] = 215;
        data[idx + 3] = 255;
        continue;
      }

      const n = fbm(u * 12, v * 12, 4);
      const intensity = 0.6 + n * 0.5;

      data[idx] = Math.floor(180 * intensity);
      data[idx + 1] = Math.floor(85 * intensity);
      data[idx + 2] = Math.floor(55 * intensity);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createJupiterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      const yTurb = v + fbm(u * 15, v * 15, 3) * 0.06;
      const band = Math.sin(yTurb * 26.0);
      
      let r = 200, g = 150, b = 120;

      if (band > 0.4) {
        r = 186; g = 111; b = 76;
      } else if (band > -0.1) {
        r = 214; g = 189; b = 163;
      } else if (band > -0.6) {
        r = 135; g = 95; b = 74;
      } else {
        r = 240; g = 225; b = 210;
      }

      const surfN = noise(u * 60, v * 60);
      r = Math.max(0, Math.min(255, r + Math.floor((surfN - 0.5) * 15)));
      g = Math.max(0, Math.min(255, g + Math.floor((surfN - 0.5) * 15)));
      b = Math.max(0, Math.min(255, b + Math.floor((surfN - 0.5) * 15)));

      const spotDx = (u - 0.68) / 0.08;
      const spotDy = (v - 0.67) / 0.05;
      const spotDist = Math.sqrt(spotDx * spotDx + spotDy * spotDy);

      if (spotDist < 1.0) {
        const spotWeight = 1.0 - spotDist;
        r = Math.floor(r * (1 - spotWeight) + 176 * spotWeight);
        g = Math.floor(g * (1 - spotWeight) + 60 * spotWeight);
        b = Math.floor(b * (1 - spotWeight) + 40 * spotWeight);
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural texture for Saturn
export function createSaturnTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      // Saturn horizontal gas bands (softer and more yellow/beige than Jupiter)
      const yTurb = v + fbm(u * 10, v * 10, 2) * 0.02;
      const band = Math.sin(yTurb * 18.0);

      let r = 226, g = 191, b = 138; // Default pale yellow/gold

      if (band > 0.5) {
        r = 210; g = 175; b = 120; // Slightly darker gold
      } else if (band > 0.0) {
        r = 238; g = 212; b = 166; // Lighter creamy yellow
      } else if (band > -0.5) {
        r = 186; g = 153; b = 104; // Light brown band
      } else {
        r = 226; g = 191; b = 138;
      }

      // Smooth surface noise
      const surfN = noise(u * 40, v * 40);
      r = Math.max(0, Math.min(255, r + Math.floor((surfN - 0.5) * 8)));
      g = Math.max(0, Math.min(255, g + Math.floor((surfN - 0.5) * 8)));
      b = Math.max(0, Math.min(255, b + Math.floor((surfN - 0.5) * 8)));

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural texture for Saturn Rings (mapped concentric rings)
export function createSaturnRingsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256; // High resolution on V axis for detail concentric rings
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    
    // Compute Ring opacity and colour bands based on Radius (represented by v coordinate)
    let r = 210, g = 180, b = 140, a = 0;

    // Cassini Division and general ring structure simulation
    if (v < 0.05) {
      a = 0; // Inner space
    } else if (v < 0.35) {
      // C Ring (semi-transparent)
      a = Math.floor(30 + v * 80);
      r = 160; g = 135; b = 110;
    } else if (v < 0.65) {
      // B Ring (brightest and thickest)
      a = Math.floor(200 + Math.sin(v * 80) * 40);
      r = 225; g = 195; b = 150;
    } else if (v < 0.72) {
      // Cassini Division (very dark gap)
      a = 5;
      r = 50; g = 40; b = 30;
    } else if (v < 0.92) {
      // A Ring (moderately bright)
      a = 150;
      r = 195; g = 165; b = 130;
    } else if (v < 0.95) {
      // Encke Gap
      a = 10;
    } else {
      a = 0; // Outer space boundary
    }

    // Add fine circular ring stripes
    const ringStripe = Math.sin(v * 450);
    if (a > 0) {
      a = Math.max(0, Math.min(255, a + Math.floor(ringStripe * 25)));
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural texture for Venus (dense, smooth yellowish-white clouds)
export function createVenusTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      // Soft cloud patterns using large scale fBm noise
      const n = fbm(u * 4, v * 4, 3);
      
      // Interpolate smooth yellowish-cream haze colors
      const r = Math.floor(225 + n * 20);
      const g = Math.floor(210 + n * 25);
      const b = Math.floor(180 + n * 20);

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural texture for Neptune (deep azure blue with white storm streaks)
export function createNeptuneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const idx = (y * width + x) * 4;

      // Deep ocean-blue base modulated by noise bands
      const band = Math.sin(v * 12.0 + fbm(u * 8, v * 8) * 0.4);
      let r = 25, g = 60, b = 150; // Deep royal blue

      if (band > 0.3) {
        r = 35; g = 80; b = 185; // Lighter blue bands
      } else {
        r = 20; g = 50; b = 135; // Deeper blue bands
      }

      // Add high velocity wispy clouds (white storms)
      const cloudN = fbm(u * 18, v * 12, 4);
      if (cloudN > 0.6) {
        const storm = (cloudN - 0.6) * 1.5;
        r = Math.floor(r * (1 - storm) + 220 * storm);
        g = Math.floor(g * (1 - storm) + 235 * storm);
        b = Math.floor(b * (1 - storm) + 255 * storm);
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
