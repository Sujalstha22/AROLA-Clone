import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import waterfallVideo from "../../assets/waterfall.mp4";
import mist from "../../assets/cloud4.png";

const Waterfall = ({ waterfallRef }) => {
  const videoRef = useRef(null);
  const mistRef = useRef(null);
  const topCloudRef = useRef(null);
  useGSAP(() => {
    // Lift the video slightly
    gsap.set(videoRef.current, {
      y: -40,
      scale: 1.05,
    });

    gsap.to(mistRef.current, {
      x: 80,
      y: -25,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(topCloudRef.current, {
      x: 0,
      y: 0,
    });

    gsap.to(mistRef.current, {
      scale: 1.08,
      opacity: 0,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={waterfallRef}
      className="relative -top-30 h-[100svh] overflow-hidden"
      style={{ marginBottom: "-8rem" }}
    >
      <img
        ref={topCloudRef}
        src={mist}
        alt=""
        className=" absolute -top-40 h-100 w-screen sm:w-[180%] lg:w-[130%] z-30 pointer-events-none select-none opacity-100
  "
      />
      {/* Video */}
      <video
        ref={videoRef}
        className=" absolute inset-0 w-full h-[110%] object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={waterfallVideo} type="video/mp4" />
      </video>

      {/* Mist Overlay */}
      <img
        ref={mistRef}
        src={mist}
        alt=""
        className=" absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] sm:w-[150%] md:w-[130%] lg:w-full pointer-events-none select-none opacity-80
        "
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
};

export default Waterfall;
