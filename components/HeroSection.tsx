'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Users } from 'lucide-react';

function MuseumHeroHead({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Bronze Head Main Sculpture */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 1.15, 2.4, 32]} />
          <meshStandardMaterial
            color="#8C5220"
            metalness={0.82}
            roughness={0.3}
          />
        </mesh>

        {/* Coral Bead Crown */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[1.0, 0.95, 0.45, 32]} />
          <meshStandardMaterial color="#B87333" metalness={0.88} roughness={0.25} />
        </mesh>

        {/* High Coral Choker Collar */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[1.15, 1.25, 0.7, 32]} />
          <meshStandardMaterial color="#A0522D" metalness={0.8} roughness={0.35} />
        </mesh>

        {/* Facial Striations Feature */}
        <mesh position={[0, 0.2, 0.98]}>
          <boxGeometry args={[0.85, 1.1, 0.15]} />
          <meshStandardMaterial color="#704214" metalness={0.78} roughness={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  const locations = [
    { name: 'Lagos', x: '18%', y: '82%' },
    { name: 'Ife', x: '28%', y: '74%' },
    { name: 'Benin City', x: '35%', y: '80%' },
    { name: 'Kano', x: '58%', y: '22%' },
    { name: 'Ibadan', x: '22%', y: '72%' },
    { name: 'Osogbo', x: '30%', y: '70%' },
    { name: 'Calabar', x: '52%', y: '88%' },
    { name: 'Igbo-Ukwu', x: '42%', y: '82%' },
    { name: 'Sukur', x: '88%', y: '32%' },
    { name: 'Oyo', x: '24%', y: '65%' },
  ];

  return (
    <section className="relative min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden select-none">

      {/* Background Topographic Contour Lines & Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg
          className="w-full h-full max-w-5xl max-h-[750px] text-[#075E45] stroke-current fill-none stroke-[0.75]"
          viewBox="0 0 800 700"
        >
          <path d="M 120 520 Q 180 480, 220 520 T 320 550 T 450 480 T 580 520 T 720 380 T 680 180 T 480 120 T 280 150 T 150 320 Z" className="opacity-40" />
          <path d="M 150 500 Q 200 460, 240 500 T 340 530 T 460 460 T 560 500 T 690 360 T 650 200 T 460 140 T 300 170 T 170 320 Z" className="opacity-60" />
          <path d="M 180 480 Q 220 440, 260 480 T 360 510 T 480 440 T 540 480 T 660 340 T 620 220 T 440 160 T 320 190 T 200 320 Z" className="opacity-80" />

          <path
            d="M 100 550 C 120 420, 160 300, 240 220 C 320 140, 480 80, 620 110 C 720 130, 760 250, 740 380 C 720 500, 580 620, 480 650 C 380 680, 220 620, 100 550 Z"
            className="stroke-[rgba(247,245,237,0.2)] stroke-[1] stroke-dasharray-[4_4]"
          />
        </svg>

        {locations.map((loc) => (
          <div
            key={loc.name}
            className="absolute hidden md:flex items-center space-x-1.5 opacity-40 hover:opacity-100 transition-opacity"
            style={{ left: loc.x, top: loc.y }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17] animate-pulse" />
            <span className="text-[9px] tracking-widest text-[#C2BDAF] uppercase font-mono">{loc.name}</span>
          </div>
        ))}
      </div>

      {/* Top Museum Header Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] tracking-[0.25em] text-[#C2BDAF] uppercase z-10 font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#C85A17]" />
          <span className="text-[#F7F5ED]">NATIONAL DIGITAL HISTORY ATLAS • EXHIBITION 01</span>
        </div>
        <div className="hidden sm:block text-[#C2BDAF]/70">
          9° 04&apos; N, 7° 29&apos; E • 250+ COMMUNITIES REGISTERED
        </div>
      </div>

      {/* Main Full-Screen Hero Composition */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10 py-12">

        {/* Left Editorial Text Section */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold">
            <Sparkles className="w-3 h-3" />
            <span>INTERACTIVE HISTORICAL ARCHIVE</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#F7F5ED]">
              NIGERIA
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#C85A17] italic font-light">
              THE LIVING ARCHIVE
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#C2BDAF] font-light leading-relaxed max-w-xl">
            &ldquo;Explore the people, places, stories and history that shaped Nigeria.&rdquo; A comprehensive spatial knowledge graph spanning three millennia of African civilization.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-5">
            <a
              href="#before-nigeria"
              className="px-8 py-4 bg-[#F7F5ED] text-[#063B2A] font-semibold text-xs tracking-widest uppercase hover:bg-[#C2BDAF] transition-all shadow-2xl flex items-center space-x-3 group"
            >
              <span>EXPLORE THE ARCHIVE</span>
              <ArrowRight className="w-4 h-4 text-[#063B2A] transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/peoples"
              className="px-8 py-4 bg-[#032218] text-[#F7F5ED] border border-[rgba(247,245,237,0.15)] font-semibold text-xs tracking-widest uppercase hover:bg-[#075E45] transition-all flex items-center space-x-3"
            >
              <Users className="w-4 h-4 text-[#C85A17]" />
              <span>PEOPLES DIRECTORY</span>
            </Link>
          </div>
        </div>

        {/* Right Museum 3D Artefact Exhibition Stage */}
        <div
          className="lg:col-span-6 h-[420px] sm:h-[520px] relative w-full flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute w-72 h-72 rounded-full bg-[#075E45]/40 blur-3xl pointer-events-none" />

          {/* Three.js Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 0, 5.2], fov: 42 }}
            className="w-full h-full cursor-grab active:cursor-grabbing z-10"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[6, 8, 6]} intensity={1.8} castShadow color="#FFF8E7" />
            <directionalLight position={[-4, -4, -2]} intensity={0.6} color="#075E45" />
            <pointLight position={[0, 0, 3]} intensity={0.8} color="#C85A17" />

            <MuseumHeroHead isHovered={isHovered} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>

          {/* Discreet Museum Label Badge */}
          <div className="absolute bottom-2 left-2 right-2 bg-[#032218]/90 backdrop-blur-md px-5 py-3.5 border border-[rgba(247,245,237,0.15)] flex items-center justify-between text-[11px] text-[#C2BDAF] z-20">
            <div>
              <p className="font-serif text-[#F7F5ED] text-base">Royal Court Head • Kingdom of Benin</p>
              <p className="text-[10px] text-[#C2BDAF] font-mono">16th Century Cast Brass • CC-BY Open Cultural Model</p>
            </div>
            <Link
              href="/artefacts/artefact-benin-bronze"
              className="text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold hover:underline"
            >
              INSPECT 3D
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] tracking-[0.2em] text-[#C2BDAF]/70 uppercase font-mono z-10 border-t border-[rgba(247,245,237,0.15)] pt-4">
        <span>SCROLL TO BEGIN EXHIBITION</span>
        <div className="w-12 h-0.5 bg-[#C85A17] animate-pulse" />
      </div>

    </section>
  );
}
