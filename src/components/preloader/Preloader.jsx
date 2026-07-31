import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const containerRef = useRef();
  const waterRef = useRef();
  const waveRef = useRef();

  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Water starts just inside the bottom of the letters
    gsap.set(waterRef.current, {
      y: 120,
    });

    // Continuous wave movement
    gsap.to(waveRef.current, {
      x: -700,
      duration: 4,
      ease: "none",
      repeat: -1,
    });

    // Small vertical breathing
    gsap.to(waveRef.current, {
      y: 6,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const loader = { value: 0 };

    gsap.to(loader, {
      value: 100,
      duration: 3.5,
      ease: "power2.out",

      onUpdate: () => {
        const value = Math.floor(loader.value);

        setProgress(value);

        // Raise water INSIDE letters
        gsap.set(waterRef.current, {
          y: 120 - value * 1.2,
        });
      },

      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          onComplete,
        });
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <svg
        width="700"
        height="220"
        viewBox="0 0 700 220"
        className="w-[90vw] max-w-[700px]"
      >
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="140"
              fontWeight="900"
              fontFamily="Arial"
              fill="white"
            >
              AROLA
            </text>
          </mask>
        </defs>

        {/* Outline */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="140"
          fontWeight="900"
          fontFamily="Arial"
          fill="none"
          stroke="#D9E6FF"
          strokeWidth="3"
        >
          AROLA
        </text>

        {/* Water */}
        <g mask="url(#text-mask)">
          <g ref={waterRef}>
            {/* Water Body */}
            <rect x="-50" y="40" width="800" height="300" fill="#2563EB" />

            {/* Animated Wave */}
            <g ref={waveRef}>
              <path
                d="
                M0 50
                Q40 28 80 50
                T160 50
                T240 50
                T320 50
                T400 50
                T480 50
                T560 50
                T640 50
                T720 50
                V320
                H0
                Z
              "
                fill="#5AAEFF"
              />

              <path
                transform="translate(700,0)"
                d="
                M0 50
                Q40 28 80 50
                T160 50
                T240 50
                T320 50
                T400 50
                T480 50
                T560 50
                T640 50
                T720 50
                V320
                H0
                Z
              "
                fill="#5AAEFF"
              />
            </g>
          </g>
        </g>
      </svg>

      {/* Progress */}
      <div className="mt-10 flex flex-col items-center gap-4 w-72">
        <span className="text-sm tracking-[0.3em] font-semibold text-[#2563EB]">
          {progress}%
        </span>

        <div className="w-full h-[3px] rounded-full overflow-hidden bg-slate-200">
          <div
            className="h-full bg-[#2563EB] transition-all duration-150"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
