"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "next-themes";

const StarBackground = (props: any) => {
  const ref = useRef<any>(null);
  // Generate random points in a sphere, memoizing prevents recreation on render
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array, []);
  const { theme } = useTheme();

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow rotation for galaxy effect (reduced speed significantly)
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;

      // Subtle mouse/scroll parallax
      // We calculate a slight offset based on mouse position and scroll
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      // Interpolate towards the target rotation to make it smooth
      ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.05 * delta;
      ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.05 * delta;
    }
  });

  // Choose star color based on theme (optional, can just be distinct)
  const starColor = theme === 'light' ? "#8b5cf6" : "#c4b5fd";

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={starColor}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  return (
    <div className="w-full h-full fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};
