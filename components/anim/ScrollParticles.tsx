"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ScrollParticlesProps {
  /** Base particles per 10,000 px² of viewport. */
  density?: number;
  /** Hard cap for small/slow devices. */
  maxParticles?: number;
  /** How strongly scrolling drives the particle rush. */
  intensity?: number;
}

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Site-wide ambient WebGL "voice field" — geometric voice-wave lines,
 * wireframe rings and triangles that react to scroll.
 *
 * Behaviour:
 *  - Ambient: horizontal voice-wave bands breathe (sine layers), rings and
 *    triangles rotate slowly and drift.
 *  - Scrolling DOWN compresses wave amplitude and pushes shapes upward in a
 *    "rush"; scrolling UP stretches the waves and drifts shapes down.
 *    Velocity is smoothed so the energy fades after you stop scrolling.
 *  - Energy also brightens line opacity and shape scale (bounded).
 *  - Theme-aware (reads --primary / --accent-logo via a MutationObserver),
 *    paused when the tab is hidden, frozen to one static frame under
 *    prefers-reduced-motion, renders nothing when WebGL is unavailable.
 *
 * Layer: fixed, z-[2], pointer-events-none, aria-hidden — purely decorative.
 */
export default function ScrollParticles({
  density = 0.55,
  maxParticles = 26,
  intensity = 1,
}: ScrollParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (!webglSupported()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // context creation failed — show nothing
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";

    // Orthographic camera maps the field to normalized [0..1]² — no aspect juggling.
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);
    camera.position.z = 1;

    // ---- geometric voice field ----
    const areaPx = window.innerWidth * window.innerHeight;
    const waveRows = Math.max(3, Math.min(6, Math.round(areaPx / 450_000)));
    const shapeCount = Math.min(
      maxParticles,
      Math.floor((areaPx / 10_000) * density)
    );

    const group = new THREE.Group();
    scene.add(group);

    const primary = new THREE.Color("#2563eb");
    const accent = new THREE.Color("#f97316");

    // -------------------------------------------------- voice-wave bands
    interface WaveLine {
      line: THREE.Line;
      baseY: number;
      baseAmp: number;
      freq: number;
      phase: number;
      segments: number;
      color: THREE.Color;
    }
    const waves: WaveLine[] = [];
    for (let r = 0; r < waveRows; r++) {
      const segments = 96;
      const positions = new Float32Array((segments + 1) * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const hueShift = r / waveRows;
      const color = primary.clone().lerp(accent, hueShift * 0.6);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18,
        linewidth: 1,
      });
      const line = new THREE.Line(geo, mat);
      line.renderOrder = 0;
      group.add(line);
      waves.push({
        line,
        baseY: (r + 0.5) / waveRows,
        baseAmp: 0.008 + r * 0.0018,
        freq: 3 + r * 0.7,
        phase: (r * 1.3 + 0.7) % (Math.PI * 2),
        segments,
        color,
      });
    }

    // -------------------------------------------------- wireframe rings
    const ringGeo = new THREE.RingGeometry(0.02, 0.032, 24);
    const ringData: { mesh: THREE.Mesh; drift: number; phase: number; spin: number }[] = [];
    for (let i = 0; i < Math.min(shapeCount, 12); i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? primary : accent,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(ringGeo.clone(), mat);
      mesh.scale.setScalar(1 + i * 0.12);
      mesh.position.set(
        (i * 0.13 + 0.1) % 1,
        (i * 0.17 + 0.2) % 1,
        0
      );
      mesh.renderOrder = 1;
      group.add(mesh);
      ringData.push({
        mesh,
        drift: 0.08 + (i % 3) * 0.06,
        phase: i * 1.7,
        spin: 0.5 + (i % 4) * 0.25,
      });
    }

    // -------------------------------------------------- wireframe triangles
    const triGeo = new THREE.BufferGeometry();
    const triVerts = new Float32Array([
      -0.04, -0.05, 0,
      0.04, -0.05, 0,
      0, 0.06, 0,
    ]);
    triGeo.setAttribute("position", new THREE.BufferAttribute(triVerts, 3));
    triGeo.computeVertexNormals();
    const triData: { mesh: THREE.Mesh; drift: number; phase: number; spin: number }[] = [];
    for (let i = 0; i < Math.min(shapeCount - ringData.length, 10); i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? accent : primary,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(triGeo.clone(), mat);
      mesh.scale.setScalar(0.8 + i * 0.1);
      mesh.position.set(
        (i * 0.19 + 0.4) % 1,
        (i * 0.23 + 0.6) % 1,
        0
      );
      mesh.renderOrder = 1;
      group.add(mesh);
      triData.push({
        mesh,
        drift: 0.06 + (i % 2) * 0.08,
        phase: i * 2.1 + 0.5,
        spin: -0.4 - (i % 3) * 0.2,
      });
    }

    // Theme-reactive colours.
    const applyColor = () => {
      const styles = getComputedStyle(document.documentElement);
      const p = styles.getPropertyValue("--primary").trim();
      const a =
        styles.getPropertyValue("--accent-logo").trim() ||
        styles.getPropertyValue("--accent").trim();
      if (p) primary.set(p);
      if (a) accent.set(a);
      waves.forEach((w, i) => {
        (w.line.material as THREE.LineBasicMaterial).color.copy(
          i === 0 ? accent : primary
        );
      });
      triData.forEach((f, i) => {
        (f.mesh.material as THREE.MeshBasicMaterial).color.copy(
          i % 2 === 0 ? accent : primary
        );
      });
    };
    applyColor();
    const themeObs = new MutationObserver(applyColor);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ---- scroll velocity tracking ----
    let lastY = window.scrollY;
    let targetVel = 0; // accumulated scroll delta (px → normalized)
    let smoothVel = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      targetVel = Math.max(-1.1, Math.min(1.1, targetVel + delta * 0.003));
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- animation loop ----
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const renderFrame = (elapsed: number) => {
      // Decay scroll velocity toward ambient.
      targetVel *= 0.92;
      smoothVel += (targetVel - smoothVel) * 0.06;
      const v = smoothVel * intensity;
      const energy = Math.min(1, Math.abs(v) * 4);

      // Voice-wave bands: scroll compresses/stretches amplitude, shifts rows.
      waves.forEach((w, wi) => {
        const pos = w.line.geometry.attributes.position as THREE.BufferAttribute;
        const amp = w.baseAmp * (1 + energy * 2.2);
        const dir = v >= 0 ? 1 : -1;
        const rowShift = -v * 0.03 * (wi % 2 === 0 ? 1 : 0.6);
        for (let s = 0; s <= w.segments; s++) {
          const x = s / w.segments;
          const y =
            w.baseY +
            rowShift +
            Math.sin(x * Math.PI * 2 * (w.freq / 6) + elapsed * 0.9 + w.phase) *
              amp +
            Math.sin(x * Math.PI * 4 + elapsed * 1.6 + w.phase * 1.7) *
              amp *
              0.45 *
              dir;
          pos.setX(s, x);
          pos.setY(s, y);
        }
        pos.needsUpdate = true;
        (w.line.material as THREE.LineBasicMaterial).opacity =
          0.14 + energy * 0.25 + (wi === 0 ? 0.08 : 0);
      });

      // Wireframe rings: ambient spin + drift, scroll rushes them upward.
      ringData.forEach((f, i) => {
        f.mesh.rotation.x += f.spin * 0.016;
        f.mesh.rotation.y += f.spin * 0.02;
        let x =
          f.mesh.position.x +
          Math.sin(elapsed * (0.2 + f.drift * 8) + f.phase) * 0.0006;
        let y = f.mesh.position.y + f.drift * 0.4 - v * 0.012;
        if (x < -0.05) x += 1.1;
        else if (x > 1.05) x -= 1.1;
        if (y < -0.05) y += 1.1;
        else if (y > 1.05) y -= 1.1;
        f.mesh.position.x = x;
        f.mesh.position.y = y;
        const pulse =
          1 + Math.sin(elapsed * 1.4 + f.phase) * 0.06 + energy * 0.25;
        f.mesh.scale.setScalar(f.mesh.scale.x * (pulse / (1 + Math.sin(elapsed * 1.4 + f.phase) * 0.06)));
        (f.mesh.material as THREE.MeshBasicMaterial).opacity =
          (i % 2 === 0 ? 0.3 : 0.24) + energy * 0.25;
      });

      // Wireframe triangles: same treatment, opposite spin direction.
      triData.forEach((f, i) => {
        f.mesh.rotation.x += f.spin * 0.016;
        f.mesh.rotation.y += f.spin * 0.02;
        let x =
          f.mesh.position.x +
          Math.cos(elapsed * (0.25 + f.drift * 7) + f.phase) * 0.0005;
        let y = f.mesh.position.y + f.drift * 0.35 - v * 0.01;
        if (x < -0.05) x += 1.1;
        else if (x > 1.05) x -= 1.1;
        if (y < -0.05) y += 1.1;
        else if (y > 1.05) y -= 1.1;
        f.mesh.position.x = x;
        f.mesh.position.y = y;
        const pulse =
          1 + Math.sin(elapsed * 1.3 + f.phase) * 0.05 + energy * 0.2;
        f.mesh.scale.setScalar(f.mesh.scale.x * (pulse / (1 + Math.sin(elapsed * 1.3 + f.phase) * 0.05)));
        (f.mesh.material as THREE.MeshBasicMaterial).opacity =
          (i % 2 === 0 ? 0.26 : 0.2) + energy * 0.22;
      });

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!running) return;
      renderFrame(clock.getElapsedTime());
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

    // Pause when offscreen / tab hidden.
    const visObs = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visObs.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      // One static, readable frame; no loop.
      renderFrame(0.5);
    }

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObs.disconnect();
      visObs.disconnect();
      waves.forEach((w) => {
        w.line.geometry.dispose();
        (w.line.material as THREE.Material).dispose();
      });
      ringData.forEach((f) => {
        (f.mesh.material as THREE.Material).dispose();
      });
      triData.forEach((f) => {
        (f.mesh.material as THREE.Material).dispose();
      });
      ringGeo.dispose();
      triGeo.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden
    />
  );
}