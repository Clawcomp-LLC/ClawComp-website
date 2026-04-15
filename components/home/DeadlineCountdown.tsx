"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-05-08T23:59:59-04:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function DeadlineCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function tick() {
      const now = Date.now();
      const diff = Math.max(0, DEADLINE - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="text-center mt-6">
      <p className="text-lg font-semibold text-brand-red mb-2">
        Deadline: May 8th
      </p>
      <div className="flex justify-center gap-3 text-sm font-mono text-text-primary">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
          <span className="text-text-muted text-xs uppercase tracking-wider">Days</span>
        </div>
        <span className="text-2xl text-text-muted">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.hours)}</span>
          <span className="text-text-muted text-xs uppercase tracking-wider">Hours</span>
        </div>
        <span className="text-2xl text-text-muted">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.minutes)}</span>
          <span className="text-text-muted text-xs uppercase tracking-wider">Min</span>
        </div>
        <span className="text-2xl text-text-muted">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white">{pad(timeLeft.seconds)}</span>
          <span className="text-text-muted text-xs uppercase tracking-wider">Sec</span>
        </div>
      </div>
    </div>
  );
}
