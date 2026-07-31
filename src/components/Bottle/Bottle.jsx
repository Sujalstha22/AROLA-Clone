import Bottle_01 from "./assets/Bottle_01.png";
import cap_01 from "./assets/cap_01.png";
import cap_02 from "./assets/cap_02.png";

const Bottle = ({ refs }) => {
  const { positionRef, groupRef, bodyRef, capClosedRef, capGlowRef } = refs;

  return (
    <div ref={positionRef} className=" fixed inset-0 pointer-events-none  ">
      <div
        ref={groupRef}
        className="
      absolute
      left-1/2
      bottom-[30vh] sm:bottom-[25vh] md:bottom-[20vh] lg:bottom-[-15vh] xl:bottom-[-13vh] 
      -translate-x-1/2 will-change-transform
        origin-center
    "
      >
        <div
          className="
          relative
          flex
          items-center
          justify-center
        "
        >
          <img
            ref={capClosedRef}
            src={cap_01}
            alt="Bottle Cap"
            className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-3 sm:-top-4 md:-top-5 lg:-top-6 xl:-top-5
            w-10 sm:w-12 md:w-14 lg:w-16 xl:w-22 max-w-none
            z-20
            select-none
          "
            draggable={false}
          />

          {/* Glowing Cap */}
          <img
            ref={capGlowRef}
            src={cap_02}
            alt="Bottle Glow Cap"
            className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-3 sm:-top-4 md:-top-5 lg:-top-6 xl:-top-5
            w-10 sm:w-12 md:w-14 lg:w-16 xl:w-24 max-w-none
            opacity-0
            z-20
            select-none
          "
            draggable={false}
          />

          {/* Bottle */}
          <img
            ref={bodyRef}
            src={Bottle_01}
            alt="Arola Bottle"
            className="
            w-14 sm:w-16 md:w-20 lg:w-24 xl:w-32 2xl:w-36
            h-auto select-none z-10 "
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Bottle;
