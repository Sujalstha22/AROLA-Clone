// ArolaPreloader.jsx
// npm install gsap
//
// Drop-in preloader. Two ways to drive it:
//   1) Controlled  — pass a `progress` prop (0–100) tied to your real asset loader.
//   2) Uncontrolled — omit `progress` and it self-simulates for dev/demo purposes.
//
// <ArolaPreloader onEnter={() => setShowSite(true)} />
// <ArolaPreloader progress={loadedPct} onEnter={...} />

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const GAP = 46;

export default function ArolaPreloader({ progress, onEnter, onEnterMuted }) {
  const svgRef = useRef(null);
  const txtARRef = useRef(null);
  const txtLARef = useRef(null);
  const pinRef = useRef(null);
  const dripRef = useRef(null);
  const waterGroupRef = useRef(null);
  const waveScrollRef = useRef(null);

  const [internalPct, setInternalPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const isControlled = typeof progress === "number";
  const pct = isControlled ? progress : internalPct;
  const done = pct >= 100;

  // --- lay out the wordmark shapes once fonts/layout are ready ---
  useLayoutEffect(() => {
    const ar = txtARRef.current.getBBox();
    const pinX = ar.width + GAP + 65;
    pinRef.current.setAttribute("transform", `translate(${pinX},0)`);

    const pinBox = pinRef.current.getBBox();
    const laX = pinBox.x + pinBox.width + GAP;
    txtLARef.current.setAttribute("x", laX);

    const laBox = txtLARef.current.getBBox();
    const totalW = laBox.x + laBox.width;
    const pad = 20;
    svgRef.current.setAttribute(
      "viewBox",
      `${-pad} ${-pad - 60} ${totalW + pad * 2} 380`,
    );

    dripRef.current.setAttribute(
      "transform",
      `translate(${pinX * (1 - 0.28)}, 96) scale(0.28)`,
    );
  }, []);

  // --- ambient animation: scrolling waves + falling drip, run once ---
  useEffect(() => {
    const waveLoop = gsap.to(waveScrollRef.current, {
      x: -500,
      duration: 3.2,
      ease: "none",
      repeat: -1,
    });

    const dripLoop = gsap.timeline({ repeat: -1 });
    dripLoop
      .set(dripRef.current, { y: 0, opacity: 0 })
      .to(dripRef.current, { opacity: 1, duration: 0.15 }, 0.08)
      .to(
        dripRef.current,
        { y: 58, opacity: 0, duration: 1.6, ease: "power1.in" },
        0.4,
      )
      .to({}, { duration: 0.6 }); // hold before next loop

    return () => {
      waveLoop.kill();
      dripLoop.kill();
    };
  }, []);

  // --- water level tracks percent ---
  useEffect(() => {
    const topY = 380 - (pct / 100) * 440;
    gsap.to(waterGroupRef.current, {
      y: topY,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [pct]);

  // --- self-simulated progress when uncontrolled ---
  useEffect(() => {
    if (isControlled) return;
    let raw = 0;
    const id = setInterval(() => {
      const step = raw < 70 ? 2 + Math.random() * 4 : 0.6 + Math.random() * 1.6;
      raw = Math.min(100, raw + step);
      setInternalPct(raw);
      if (raw >= 100) clearInterval(id);
    }, 140);
    return () => clearInterval(id);
  }, [isControlled]);

  function handleEnter(muted) {
    setLeaving(true);
    setTimeout(() => (muted ? onEnterMuted?.() : onEnter?.()), 700);
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-9 bg-[#f6f8fc] transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className="w-[min(78vw,760px)]"
        style={{ filter: "drop-shadow(0 18px 40px rgba(29,63,209,.18))" }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 380"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <g id="arola-shapes">
              <text
                ref={txtARRef}
                x="0"
                y="260"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="900"
                fontSize="210"
                letterSpacing="-6"
              >
                AR
              </text>
              <path
                ref={pinRef}
                d="M -65,-70 C -65,-115 -35,-150 0,-150 C 35,-150 65,-115 65,-70 C 65,-20 20,40 0,90 C -20,40 -65,-20 -65,-70 Z"
              />
              <text
                ref={txtLARef}
                x="0"
                y="260"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="900"
                fontSize="210"
                letterSpacing="-6"
              >
                LA
              </text>
            </g>
            <clipPath id="arola-clip">
              <use href="#arola-shapes" />
            </clipPath>
          </defs>

          {/* empty outline state */}
          <use
            href="#arola-shapes"
            fill="none"
            stroke="#e3e8f2"
            strokeWidth="2.5"
          />

          {/* water fill, clipped to the letterforms */}
          <g clipPath="url(#arola-clip)">
            <g ref={waterGroupRef}>
              <rect x="-100" y="0" width="1200" height="900" fill="#1d3fd1" />
              <g ref={waveScrollRef}>
                <path
                  d="M0,0 C 60,-22 110,18 170,0 C 230,-22 280,18 340,0 C 400,-22 450,18 510,0 C 570,-22 620,18 680,0 L 680,40 L 0,40 Z"
                  fill="#5a8bf0"
                  opacity=".85"
                />
                <path
                  d="M500,0 C 560,-22 610,18 670,0 C 730,-22 780,18 840,0 C 900,-22 950,18 1010,0 C 1070,-22 1120,18 1180,0 L 1180,40 L 500,40 Z"
                  fill="#5a8bf0"
                  opacity=".85"
                />
                <path
                  d="M0,10 C 70,-8 130,26 200,10 C 270,-8 330,26 400,10 C 470,-8 530,26 600,10 L 600,45 L 0,45 Z"
                  fill="#0b1957"
                />
                <path
                  d="M500,10 C 570,-8 630,26 700,10 C 770,-8 830,26 900,10 C 970,-8 1030,26 1100,10 L 1100,45 L 500,45 Z"
                  fill="#0b1957"
                />
              </g>
            </g>
          </g>

          {/* falling drip beneath the pin */}
          <use ref={dripRef} href="#arola-shapes" fill="#1d3fd1" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4 h-[120px]">
        <div
          className={`text-[13px] font-semibold tracking-[.18em] text-[#5a8bf0] transition-opacity duration-400 ${
            done ? "opacity-0" : "opacity-100"
          }`}
        >
          {Math.floor(pct)}% LOADED
        </div>
        <div
          className={`w-[220px] h-[2px] rounded-full bg-[#e3e8f2] overflow-hidden transition-opacity duration-400 ${
            done ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#5a8bf0] to-[#1d3fd1]"
            style={{ width: `${pct}%`, transition: "width .25s ease-out" }}
          />
        </div>

        <div
          className={`absolute flex flex-col items-center gap-4 transition-all duration-700 ${
            done
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            onClick={() => handleEnter(false)}
            className="px-10 py-[15px] rounded-full bg-[#0b1957] text-[#f6f8fc] text-sm font-semibold tracking-wide shadow-[0_10px_30px_rgba(11,25,87,.25)] transition-all hover:-translate-y-0.5 hover:bg-[#1d3fd1] hover:shadow-[0_14px_34px_rgba(11,25,87,.32)]"
          >
            Enter Experience
          </button>
          <button
            onClick={() => handleEnter(true)}
            className="text-[11px] font-semibold tracking-[.14em] text-[#9aa8c7] transition-colors hover:text-[#0b1957]"
          >
            ENTER WITHOUT SOUND
          </button>
        </div>
      </div>
    </div>
  );
}
