'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, RotateCcw, Info, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Model3D, Hotspot3D } from '@/types/archive';

interface Props {
  model?: Model3D;
  title: string;
  material: string;
  period: string;
  provenance: string;
}

function Render3DObject({ hotspots, activeHotspotId, onSelectHotspot }: {
  hotspots?: Hotspot3D[];
  activeHotspotId: string | null;
  onSelectHotspot: (h: Hotspot3D) => void;
}) {
  const meshGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={meshGroupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>

        {/* Main Base Sculpture Geometry */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 1.1, 2.2, 32]} />
          <meshStandardMaterial
            color="#8C5220"
            metalness={0.8}
            roughness={0.3}
            bumpScale={0.05}
          />
        </mesh>

        {/* Crown / Head Details */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.95, 0.9, 0.4, 32]} />
          <meshStandardMaterial color="#B87333" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Facial Relief Feature */}
        <mesh position={[0, 0.2, 0.95]}>
          <boxGeometry args={[0.8, 1.0, 0.2]} />
          <meshStandardMaterial color="#704214" metalness={0.75} roughness={0.4} />
        </mesh>

        {/* Hotspots */}
        {hotspots?.map((hs) => {
          const isSelected = activeHotspotId === hs.id;
          return (
            <group key={hs.id} position={hs.position}>
              <mesh onClick={() => onSelectHotspot(hs)}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={isSelected ? '#C85A17' : '#E8E3D9'} />
              </mesh>
              <Html distanceFactor={8}>
                <button
                  onClick={() => onSelectHotspot(hs)}
                  className={`px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded shadow border ${
                    isSelected
                      ? 'bg-[#C85A17] text-[#E8E3D9] border-[#C85A17]'
                      : 'bg-[#0A0B0D]/90 text-[#9CA3AF] border-[#2A2D36] hover:text-[#E8E3D9]'
                  }`}
                >
                  {hs.title}
                </button>
              </Html>
            </group>
          );
        })}

      </Float>
    </group>
  );
}

export default function Artefact3DViewer({ model, title, material, period, provenance }: Props) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(
    model?.hotspots?.[0] || null
  );
  const [showTextFallback, setShowTextFallback] = useState(false);

  return (
    <div className="bg-[#121418] border border-[#2A2D36] rounded-lg overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">

      {/* 3D Stage / Canvas */}
      <div className="lg:col-span-8 h-[400px] sm:h-[500px] relative bg-[#0A0B0D] border-r border-[#2A2D36] flex items-center justify-center">

        {!showTextFallback ? (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, -5, -2]} intensity={0.6} color="#C85A17" />
            <Render3DObject
              hotspots={model?.hotspots}
              activeHotspotId={activeHotspot?.id || null}
              onSelectHotspot={(hs) => setActiveHotspot(hs)}
            />
            <OrbitControls enableZoom enablePan maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
          </Canvas>
        ) : (
          <div className="p-8 text-center space-y-4 max-w-md">
            <Info className="w-8 h-8 text-[#C85A17] mx-auto" />
            <h4 className="font-serif text-xl text-[#E8E3D9]">Text-Only Object Alternative</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              {title} is a {material} object originating from the {period}. {provenance}
            </p>
            <button
              onClick={() => setShowTextFallback(false)}
              className="text-xs text-[#C85A17] underline uppercase tracking-widest"
            >
              Switch back to 3D Canvas
            </button>
          </div>
        )}

        {/* Floating Controls Bar */}
        <div className="absolute top-4 left-4 bg-[#0A0B0D]/80 backdrop-blur-md p-2 rounded border border-[#2A2D36] text-[10px] text-[#9CA3AF] flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#E8E3D9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17]" />
            <span>3D DEMONSTRATION MODEL</span>
          </span>
          <span>•</span>
          <button
            onClick={() => setShowTextFallback(!showTextFallback)}
            className="hover:text-[#C85A17] underline uppercase"
          >
            {showTextFallback ? '3D View' : 'Text View'}
          </button>
        </div>

        <div className="absolute bottom-4 left-4 bg-[#0A0B0D]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#2A2D36] text-[10px] font-mono text-[#9CA3AF]">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Object Metadata & Hotspot Panel */}
      <div className="lg:col-span-4 p-6 bg-[#181A20] flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2D36] pb-2">
            <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
              OBJECT DOSSIER
            </span>
            <span className="text-[10px] font-mono text-[#9CA3AF]">{period}</span>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-[#E8E3D9]">{title}</h3>
            <p className="text-xs text-[#C85A17] font-mono mt-1">Material: {material}</p>
          </div>

          {/* Active Hotspot Callout */}
          {activeHotspot && (
            <div className="bg-[#121418] p-4 rounded border border-[#C85A17]/40 space-y-2">
              <span className="text-[9px] font-mono text-[#C85A17] uppercase tracking-widest block">
                ANNOTATED FEATURE HOTSPOT
              </span>
              <h5 className="font-serif text-base text-[#E8E3D9]">{activeHotspot.title}</h5>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}

          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <p className="text-[10px] text-[#E8E3D9] font-medium uppercase tracking-wider">PROVENANCE HISTORY</p>
            <p className="leading-relaxed bg-[#121418] p-3 rounded border border-[#2A2D36]">
              {provenance}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#2A2D36] flex items-center justify-between text-[10px] text-[#9CA3AF]">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>Sourced Record</span>
          </span>
          <span>Model Type: {model?.modelType || 'reconstruction'}</span>
        </div>

      </div>

    </div>
  );
}
