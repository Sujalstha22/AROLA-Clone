import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHeroAnimation = ({
  heroRef,
  circleWrapperRef,
  circleStrokeRef,
  scrollTextRef,
  welcomeTextRef,
}) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.add("intro")

        .to(
          scrollTextRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 0.5,
            ease: "none",
          },
          "intro",
        )

        .fromTo(
          welcomeTextRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 1,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1.4,
            ease: "none",
          },
          "intro",
        )

        .to(
          circleWrapperRef.current,
          {
            scale: 1.5,
            ease: "none",
          },
          "intro",
        )

        .to(
          circleStrokeRef.current,
          {
            attr: {
              "stroke-width": 10,
            },
            ease: "none",
          },
          "intro",
        );
    },
    { scope: heroRef },
  );
};

export default useHeroAnimation;
