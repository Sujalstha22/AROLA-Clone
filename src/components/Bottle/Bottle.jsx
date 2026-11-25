import Bottle_01 from './assets/Bottle_01.png';
import cap_01 from './assets/cap_01.png';
import cap_02 from './assets/cap_02.png';

const Bottle = ({ refs }) => {
  const { positionRef, groupRef, bodyRef, capClosedRef, capGlowRef } = refs;

  return (
    <div ref={positionRef} className="pointer-events-none fixed inset-0">
      <div
        ref={groupRef}
        className="absolute bottom-[30vh] left-1/2 origin-center -translate-x-1/2 will-change-transform sm:bottom-[25vh] md:bottom-[20vh] lg:bottom-[-15vh] xl:bottom-[-13vh]"
      >
        <div className="relative flex items-center justify-center">
          <img
            ref={capClosedRef}
            src={cap_01}
            alt="Bottle Cap"
            className="absolute -top-3 left-1/2 z-20 w-10 max-w-none -translate-x-1/2 select-none sm:-top-4 sm:w-12 md:-top-5 md:w-14 lg:-top-6 lg:w-16 xl:-top-5 xl:w-22"
            draggable={false}
          />

          {/* Glowing Cap */}
          <img
            ref={capGlowRef}
            src={cap_02}
            alt="Bottle Glow Cap"
            className="absolute -top-3 left-1/2 z-20 w-10 max-w-none -translate-x-1/2 opacity-0 select-none sm:-top-4 sm:w-12 md:-top-5 md:w-14 lg:-top-6 lg:w-16 xl:-top-5 xl:w-24"
            draggable={false}
          />

          {/* Bottle */}
          <img
            ref={bodyRef}
            src={Bottle_01}
            alt="Arola Bottle"
            className="z-10 h-auto w-14 select-none sm:w-16 md:w-20 lg:w-24 xl:w-32 2xl:w-36"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Bottle;
