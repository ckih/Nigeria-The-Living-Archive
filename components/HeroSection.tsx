'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, RotateCcw, Maximize2, Compass } from 'lucide-react';

function HeroBronzeObject({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Plaque main body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 2.8, 0.25]} />
          <meshStandardMaterial
            color="#8C5220"
            metalness={0.8}
            roughness={0.35}
            bumpScale={0.05}
          />
        </mesh>

        {/* Embossed Crown Motif */}
        <mesh position={[0, 0.8, 0.16]}>
          <cylinderGeometry args={[0.5, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#B87333" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Central Oba Figure Emblem */}
        <mesh position={[0, 0.1, 0.18]}>
          <cylinderGeometry args={[0.4, 0.45, 0.8, 12]} />
          <meshStandardMaterial color="#A0522D" metalness={0.75} roughness={0.4} />
        </mesh>

        {/* Side Attendant Motifs */}
        <mesh position={[-0.7, 0, 0.16]}>
          <cylinderGeometry args={[0.2, 0.22, 0.9, 12]} />
          <meshStandardMaterial color="#704214" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[0.7, 0, 0.16]}>
          <cylinderGeometry args={[0.2, 0.22, 0.9, 12]} />
          <meshStandardMaterial color="#704214" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Bottom Decorative Band */}
        <mesh position={[0, -1.1, 0.15]}>
          <boxGeometry args={[2.0, 0.25, 0.1]} />
          <meshStandardMaterial color="#B87333" metalness={0.85} roughness={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#0A0B0D] text-[#E8E3D9] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden archival-grid">

      {/* Background Subtle Glowing Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C85A17]/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Archival Marker */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] tracking-[0.25em] text-[#9CA3AF] uppercase z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#C85A17] animate-pulse" />
          <span>ARCHIVAL REPOSITORY 01 • NIGERIA</span>
        </div>
        <div className="font-mono text-[10px] hidden sm:block text-[#9CA3AF]">
          9° 04&apos; N, 7° 29&apos; E
        </div>
      </div>

      {/* Hero Content & 3D Stage Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10 py-8">

        {/* Left Column: Headlines */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#181A20] border border-[#2A2D36] text-[10px] tracking-widest text-[#C85A17] uppercase">
            <Sparkles className="w-3 h-3" />
            <span>INTERACTIVE DIGITAL MUSEUM & ATLAS</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#E8E3D9]">
            NIGERIA
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#9CA3AF] italic max-w-2xl font-light">
            &ldquo;A history too large for a single timeline.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            Explore the interconnected peoples, kingdoms, places, artefacts, and events that shaped a nation. Built as a living historical knowledge graph.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#before-nigeria"
              className="px-6 py-3 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] font-medium text-xs tracking-widest uppercase transition-all rounded shadow-lg shadow-[#C85A17]/20 flex items-center space-x-2"
            >
              <span>EXPLORE THE ARCHIVE</span>
            </a>
            <a
              href="#interactive-map"
              className="px-6 py-3 bg-[#121418] hover:bg-[#181A20] text-[#E8E3D9] font-medium text-xs tracking-widest uppercase transition-all rounded border border-[#2A2D36] hover:border-[#C85A17]/50 flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-[#C85A17]" />
              <span>ENTER THE MAP</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero 3D Historical Object Canvas */}
        <div
          className="lg:col-span-5 h-[380px] sm:h-[450px] relative bg-[#121418]/60 border border-[#2A2D36] rounded-lg p-2 overflow-hidden shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, -5, -2]} intensity={0.5} color="#C85A17" />
            <HeroBronzeObject isHovered={isHovered} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
          </Canvas>

          {/* Overlay Badge */}
          <div className="absolute top-4 left-4 bg-[#0A0B0D]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#2A2D36] text-[10px] tracking-widest text-[#9CA3AF] uppercase flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17]" />
            <span>Interactive 3D Demonstration</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-[#0A0B0D]/80 backdrop-blur-md p-3 rounded border border-[#2A2D36] flex items-center justify-between text-[11px] text-[#9CA3AF]">
            <div>
              <p className="font-serif text-[#E8E3D9]">Benin Royal Court Bronze Plaque</p>
              <p className="text-[10px] text-[#9CA3AF]">Drag to rotate 360°</p>
            </div>
            <a
              href="/artefacts/artefact-benin-bronze"
              className="text-[10px] tracking-widest text-[#C85A17] uppercase hover:underline"
            >
              VIEW FULL 3D
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] tracking-widest text-[#9CA3AF] uppercase z-10 border-t border-[#2A2D36]/40 pt-4">
        <span>SCROLL TO UNCOVER EPOCHS</span>
        <div className="w-8 h-0.5 bg-[#C85A17] animate-pulse" />
      </div>

    </section>
  );
}
