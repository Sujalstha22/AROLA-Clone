import React from "react";

const FloatingBottle = () => {
  return <div></div>;
  return (
      <div
        ref={bottleGroupRef}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          bottom-[-45%]
          sm:bottom-[-48%]
          md:bottom-[-52%]
          lg:bottom-[-56%]
          xl:bottom-[-60%]
          pointer-events-none
          flex
          justify-center
          z-50
        "
      >
        <img
          ref={capClosedRef}
          src={cap_01}
          alt=""
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-4
            sm:-top-5
            md:-top-6
            lg:-top-7
            xl:-top-5
            w-10
            sm:w-12
            md:w-14
            lg:w-16
            xl:w-18
            z-20
          "
        />
  
        <img
          ref={capGlowRef}
          src={cap_02}
          alt=""
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-4
            sm:-top-5
            md:-top-6
            lg:-top-7
            xl:-top-5
            w-10
            sm:w-12
            md:w-14
            lg:w-16
            xl:w-18
            opacity-0
            z-20
          "
        />
  
        <img
          ref={bottleRef}
          src={Bottle_01}
          alt=""
          className="
            w-12
            sm:w-16
            md:w-20
            lg:w-24
            xl:w-28
            h-auto
          "
        />
      </div>
};

export default FloatingBottle;
