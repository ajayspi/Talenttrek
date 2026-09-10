"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AudioReactiveState {
  /** 0–1 normalised amplitude from the microphone. */
  amplitude: number;
  /** True while the AudioContext is running. */
  listening: boolean;
  /** Call to start capturing the mic. */
  start: () => Promise<void>;
  /** Call to stop and clean up. */
  stop: () => void;
}

/**
 * Captures microphone input and exposes a normalised 0–1 amplitude value
 * that updates every animation frame.  Gracefully degrades when the Web
 * Audio API is unavailable or the user denies mic permission.
 */
export function useAudioReactive(): AudioReactiveState {
  const [amplitude, setAmplitude] = useState(0);
  const [listening, setListening] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    setAmplitude(Math.min(rms * 4, 1));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(async () => {
    if (listening) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      ctx.createMediaStreamSource(stream).connect(analyser);
      setListening(true);
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      /* permission denied or API unavailable — silently degrade */
    }
  }, [listening, tick]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    ctxRef.current?.close();
    streamRef.current = null;
    ctxRef.current = null;
    analyserRef.current = null;
    setListening(false);
    setAmplitude(0);
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { amplitude, listening, start, stop };
}
