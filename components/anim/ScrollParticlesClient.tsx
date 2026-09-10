"use client";

import dynamic from "next/dynamic";

// WebGL is heavy and this lives on every route — load client-side only,
// never blocking first paint.
const ScrollParticles = dynamic(() => import("./ScrollParticles"), {
  ssr: false,
  loading: () => null,
});

export default function ScrollParticlesClient() {
  return <ScrollParticles />;
}