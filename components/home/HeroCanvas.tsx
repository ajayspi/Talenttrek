"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ParticleWave from "@/components/anim/ParticleWave";

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Three.js waveform — a drifting grid of points displaced by layered sine
 * waves. Theme-reactive (reads --primary from CSS), pointer-parallax,
 * paused offscreen/hidden, single static frame under reduced motion.
 * Falls back to the brand hero GIF when WebGL is unavailable.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [noWebGL, setNoWebGL] = useState(false);

  useEffect(() => {
    if (!webglSupported()) {
      setNoWebGL(true);
      return;
    }
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 4.2, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Waveform point grid
    const COLS = 90;
    const ROWS = 40;
    const SEP = 0.42;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    let idx = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iz = 0; iz < ROWS; iz++) {
        positions[idx++] = (ix - COLS / 2) * SEP;
        positions[idx++] = 0;
        positions[idx++] = (iz - ROWS / 2) * SEP;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Theme-reactive colour
    const applyTheme = () => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (c) material.color = new THREE.Color(c);
    };
    applyTheme();
    const themeObs = new MutationObserver(applyTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Pointer parallax
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const animate = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setY(
          i,
          Math.sin(x * 0.55 + t * 0.9) * 0.55 +
            Math.cos(z * 0.4 + t * 0.6) * 0.35 +
            Math.sin((x + z) * 0.25 + t * 0.4) * 0.25,
        );
      }
      pos.needsUpdate = true;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (4.2 + targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when offscreen or when the tab is hidden.
    const visObs = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visObs.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      // Static frame — no animation loop for reduced motion.
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObs.disconnect();
      visObs.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  if (noWebGL) {
    // Fallback: 2D particle wave when WebGL is unavailable.
    return <ParticleWave />;
  }

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}