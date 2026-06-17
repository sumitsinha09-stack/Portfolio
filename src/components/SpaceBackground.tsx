import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  createMoonTexture,
  createEarthTexture,
  createEarthCloudsTexture,
  createMarsTexture,
  createJupiterTexture,
  createSaturnTexture,
  createSaturnRingsTexture,
  createVenusTexture,
  createNeptuneTexture
} from '../lib/planetTextures';

// Keyframes mapping page scroll percentage to planet group Y translations
const keyframes = [
  { scroll: 0.00, y: 0.0 },   // Hero (Moon)
  { scroll: 0.16, y: 14.0 },  // About (Earth)
  { scroll: 0.33, y: 28.0 },  // Skills (Mars)
  { scroll: 0.50, y: 42.0 },  // Experience (Saturn)
  { scroll: 0.66, y: 56.0 },  // Projects (Jupiter)
  { scroll: 0.83, y: 70.0 },  // Certifications (Venus)
  { scroll: 1.00, y: 84.0 }   // Contact (Neptune)
];

function interpolateY(scroll: number): number {
  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (scroll >= k1.scroll && scroll <= k2.scroll) {
      const t = (scroll - k1.scroll) / (k2.scroll - k1.scroll);
      // Cubic easing for smoother section transit
      const easedT = t * t * (3 - 2 * t);
      return k1.y + easedT * (k2.y - k1.y);
    }
  }
  return keyframes[keyframes.length - 1].y;
}

// 3D Shader for realistic atmospheric scattering glow
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 glowColor;
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
      gl_FragColor = vec4(glowColor, 1.0) * intensity;
    }
  `
};

interface AtmosphereProps {
  radius: number;
  color: string;
}

const Atmosphere: React.FC<AtmosphereProps> = ({ radius, color }) => {
  const uniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color(color) }
  }), [color]);

  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        vertexShader={AtmosphereShader.vertexShader}
        fragmentShader={AtmosphereShader.fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const MarsDust = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 1.9 + Math.random() * 1.2;
      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = dist * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f0785a"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingSpaceDust = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a5f3fc"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

interface SceneProps {
  scrollPercent: number;
}

const SpaceScene: React.FC<SceneProps> = ({ scrollPercent }) => {
  const groupRef = useRef<THREE.Group>(null);
  const starGroupRef = useRef<THREE.Group>(null);
  const currentY = useRef(0);

  const moonRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const earthCloudsRef = useRef<THREE.Mesh>(null);
  const marsRef = useRef<THREE.Mesh>(null);
  const saturnRef = useRef<THREE.Mesh>(null);
  const jupiterRef = useRef<THREE.Mesh>(null);
  const venusRef = useRef<THREE.Mesh>(null);
  const neptuneRef = useRef<THREE.Mesh>(null);

  // Load procedural textures inside the canvas context
  const textures = useMemo(() => ({
    moon: createMoonTexture(),
    earth: createEarthTexture(),
    earthClouds: createEarthCloudsTexture(),
    mars: createMarsTexture(),
    saturn: createSaturnTexture(),
    saturnRings: createSaturnRingsTexture(),
    jupiter: createJupiterTexture(),
    venus: createVenusTexture(),
    neptune: createNeptuneTexture()
  }), []);

  // Smooth mouse inputs targets
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) - 0.5;
      mouseY.current = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // 1. Interpolate Y position from scroll percentage with smooth easing
    const targetY = interpolateY(scrollPercent);
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, 0.05);

    // 2. Parallax mouse tracking with inertia
    const targetMouseX = mouseX.current * 0.8;
    const targetMouseY = -mouseY.current * 0.8; // invert Y for R3F space coordinates

    if (groupRef.current) {
      groupRef.current.position.y = currentY.current;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetMouseX, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetMouseY * 0.5, 0.05);
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetMouseY * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetMouseX * 0.1, 0.05);
    }

    if (starGroupRef.current) {
      starGroupRef.current.position.x = THREE.MathUtils.lerp(starGroupRef.current.position.x, targetMouseX * 0.2, 0.05);
      starGroupRef.current.position.y = THREE.MathUtils.lerp(starGroupRef.current.position.y, currentY.current * 0.2 + targetMouseY * 0.2, 0.05);
    }

    // 3. Planet Rotations
    const rotationSpeed = delta * 0.05;
    
    if (moonRef.current) {
      moonRef.current.rotation.y += rotationSpeed * 0.5;
    }
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    if (earthCloudsRef.current) {
      earthCloudsRef.current.rotation.y += rotationSpeed * 1.15;
    }
    if (marsRef.current) {
      marsRef.current.rotation.y += rotationSpeed * 0.8;
    }
    if (saturnRef.current) {
      saturnRef.current.rotation.y += rotationSpeed * 0.7;
    }
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += rotationSpeed * 1.6;
    }
    if (venusRef.current) {
      venusRef.current.rotation.y += rotationSpeed * 0.6;
    }
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += rotationSpeed * 1.3;
    }
  });

  return (
    <>
      {/* Background Starfield */}
      <group ref={starGroupRef}>
        <Stars radius={110} depth={50} count={3500} factor={6} saturation={0.5} fade speed={1.2} />
        <FloatingSpaceDust />
      </group>

      {/* Sun/Light Sources */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[12, 6, 8]} intensity={1.8} color="#fffaed" />
      <directionalLight position={[-12, -4, -6]} intensity={0.15} color="#8cb0ff" />

      {/* Planet Systems */}
      <group ref={groupRef}>
        {/* HERO / LANDING PAGE: Moon (Large, centered in background) */}
        <group position={[0.5, 0, -6]}>
          <mesh ref={moonRef}>
            <sphereGeometry args={[3.2, 32, 32]} />
            <meshStandardMaterial
              map={textures.moon}
              roughness={0.92}
              metalness={0.05}
            />
          </mesh>
          <Atmosphere radius={3.35} color="#ffffff" />
        </group>

        {/* ABOUT SECTION: Earth (Left-aligned backdrop) */}
        <group position={[-2.4, -14.0, -3]}>
          <mesh ref={earthRef}>
            <sphereGeometry args={[2.0, 32, 32]} />
            <meshStandardMaterial
              map={textures.earth}
              roughness={0.65}
              metalness={0.1}
            />
          </mesh>
          <mesh ref={earthCloudsRef}>
            <sphereGeometry args={[2.035, 32, 32]} />
            <meshStandardMaterial
              map={textures.earthClouds}
              transparent
              opacity={0.8}
              depthWrite={false}
            />
          </mesh>
          <Atmosphere radius={2.16} color="#00a2ff" />
        </group>

        {/* SKILLS SECTION: Mars (Right-aligned backdrop) */}
        <group position={[2.5, -28.0, -3.5]}>
          <mesh ref={marsRef}>
            <sphereGeometry args={[1.7, 32, 32]} />
            <meshStandardMaterial
              map={textures.mars}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
          <Atmosphere radius={1.82} color="#ff5a36" />
          <MarsDust />
        </group>

        {/* EXPERIENCE SECTION: Saturn (Left-aligned backdrop with concentric rings) */}
        <group position={[-2.5, -42.0, -4.0]}>
          <mesh ref={saturnRef}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
              map={textures.saturn}
              roughness={0.8}
              metalness={0.05}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[1.8, 3.3, 64]} />
            <meshStandardMaterial
              map={textures.saturnRings}
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
              depthWrite={false}
            />
          </mesh>
          <Atmosphere radius={1.62} color="#e5c599" />
        </group>

        {/* PROJECTS SECTION: Jupiter (Right-aligned backdrop) */}
        <group position={[2.8, -56.0, -4.5]}>
          <mesh ref={jupiterRef}>
            <sphereGeometry args={[2.6, 64, 64]} />
            <meshStandardMaterial
              map={textures.jupiter}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
          <Atmosphere radius={2.78} color="#e6be95" />
        </group>

        {/* CERTIFICATIONS SECTION: Venus (Left-aligned backdrop) */}
        <group position={[-2.4, -70.0, -3.5]}>
          <mesh ref={venusRef}>
            <sphereGeometry args={[1.7, 32, 32]} />
            <meshStandardMaterial
              map={textures.venus}
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>
          <Atmosphere radius={1.82} color="#e6ca9c" />
        </group>

        {/* CONTACT SECTION: Neptune (Right-aligned backdrop) */}
        <group position={[2.5, -84.0, -3.5]}>
          <mesh ref={neptuneRef}>
            <sphereGeometry args={[1.8, 32, 32]} />
            <meshStandardMaterial
              map={textures.neptune}
              roughness={0.75}
              metalness={0.1}
            />
          </mesh>
          <Atmosphere radius={1.92} color="#2575e6" />
        </group>
      </group>
    </>
  );
};

export default function SpaceBackground() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) return;
      setScrollPercent(doc.scrollTop / total);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#02050f]" style={{ mixBlendMode: 'normal' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <SpaceScene scrollPercent={scrollPercent} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02050f]/80 pointer-events-none" />
    </div>
  );
}
