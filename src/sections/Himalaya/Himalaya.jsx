import React, { useRef } from "react";

import mountainBack from "../../assets/mountain-back.png";
import mountainFront from "../../assets/cloud6.png";

import useHimalayaAnimation from "./useHimalayaAnimation";

const Himalaya = ({ himalayaRef }) => {
  const mountainBackRef = useRef();
  const mountainFrontRef = useRef();
  const headingRef = useRef();

  useHimalayaAnimation({
    sectionRef: himalayaRef,
    mountainBackRef,
    mountainFrontRef,
    headingRef,
  });

  return (
    <section
      ref={himalayaRef}
      className="relative h-[120vh]  bg-white overflow-hidden"
    >
      <div className=" relative h-[100svh] overflow-visible">
        {/* Blue circle */}
        <div
          className="
             absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[55vw] md:w-[42vw] lg:w-[30vw] xl:w-[24vw] aspect-square rounded-full bg-[radial-gradient(circle,_#123DAB_0%,_#0A2F90_45%,_#06267E_75%,_#031A59_100%)]
          "
        />

        {/* BACK MOUNTAIN */}
        <img
          ref={mountainBackRef}
          src={mountainBack}
          className="
             absolute left-0 bottom-0 w-full h-auto z-20 pointer-events-none select-none "
        />

        {/* FRONT MOUNTAIN */}
        <img
          ref={mountainFrontRef}
          src={mountainFront}
          className="
            absolute left-0 w-screen -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-16 h-auto z-40 pointer-events-none select-none "
        />

        <div
          ref={headingRef}
          className=" absolute inset-0 flex flex-col -bottom-40 items-center justify-end pb-24 pointer-events-none z-[999] "
        >
          <h2 className="text-[4vw] text-[#0A2F90] leading-none">
            Experience Himalayan
          </h2>

          <h2 className="text-[4vw] leading-none">
            <span className="text-[#0A2F90]">water with Arola</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Himalaya;
