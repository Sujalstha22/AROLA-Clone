import { useRef } from "react";
import CircleFrame from "../../components/ui/CircleFrame";
import useHeroAnimation from "./useHeroAnimation";

const Hero = ({ heroRef }) => {
  const circleWrapperRef = useRef(null);
  const circleStrokeRef = useRef(null);

  const scrollTextRef = useRef(null);
  const welcomeTextRef = useRef(null);

  useHeroAnimation({
    heroRef,
    circleWrapperRef,
    circleStrokeRef,
    scrollTextRef,
    welcomeTextRef,
  });

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen top-[-10vh] items-center justify-center overflow-hidden -translate-y-6
        sm:-translate-y-8
        md:-translate-y-10"
    >
      <CircleFrame
        circleWrapperRef={circleWrapperRef}
        circleStrokeRef={circleStrokeRef}
      >
        <h2
          ref={scrollTextRef}
          className="absolute px-6 text-center text-sm
            sm:text-base
            md:text-lg
            lg:text-xl font-semibold leading-tight text-[#002685]"
        >
          PLEASE,
          <br />
          SCROLL DOWN
        </h2>

        <h2
          ref={welcomeTextRef}
          className="absolute px-6 text-center text-sm
            sm:text-base
            md:text-lg
            lg:text-xl font-semibold leading-tight text-[#002685] opacity-0"
        >
          WELCOME TO AROLA
        </h2>
      </CircleFrame>
    </section>
  );
};

export default Hero;
