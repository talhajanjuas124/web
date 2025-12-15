"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // subtle fog for depth
    scene.fog = new THREE.Fog(0x0a0a0a, 18, 60);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Particles cloud
    const count = 1400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random points in a hollow sphere
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color("#2563eb"), // brand
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Wireframe wave grid
    const w = 60;
    const h = 36;
    const segW = 48;
    const segH = 28;
    const gridGeo = new THREE.PlaneGeometry(w, h, segW, segH);
    const gridMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3b82f6"),
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -0.85;
    grid.position.y = -4.5;
    group.add(grid);

    const clock = new THREE.Clock();

    // Respect reduced motion
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mql.matches;
    const handleReduceChange = () => {
      reduce = mql.matches;
    };
    mql.addEventListener?.("change", handleReduceChange);

    function animate() {
      const t = clock.getElapsedTime();

      // gentle rotations (reduced motion lowers intensity)
      const rotScale = reduce ? 0.2 : 1;
      group.rotation.y = t * 0.06 * rotScale;
      group.rotation.x = Math.sin(t * 0.2) * 0.05 * rotScale;

      // animate grid vertices for wave effect
      const pos = gridGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const x = pos.array[ix] as number;
        const y = pos.array[ix + 1] as number;
        const amp = reduce ? 0.2 : 1;
        const wave = (Math.sin((x + t) * 0.6) * 0.35 + Math.cos((y + t * 0.8) * 0.4) * 0.25) * amp;
        pos.array[ix + 2] = wave;
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      mql.removeEventListener?.("change", handleReduceChange);
      pGeo.dispose();
      gridGeo.dispose();
      pMat.dispose();
      gridMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // mask to fade at bottom so text remains readable
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.5)_40%,transparent_85%)]"
    />
  );
}
