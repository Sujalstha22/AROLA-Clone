import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const useHimalayaAnimation = ({
  sectionRef,
  mountainBackRef,
  mountainFrontRef,
  headingRef,
}) => {
  useGSAP(
    () => {
      gsap.set(mountainBackRef.current, {
        yPercent: 60,
      });

      gsap.set(mountainFrontRef.current, {
        yPercent: 72,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 60%",
          scrub: 2,
        },
      });
      tl.fromTo(
        mountainBackRef.current,
        { yPercent: 60 },
        {
          yPercent: 0,
          scale: 1.05,
          duration: 0.65,
          ease: "none",
        },
      );
      tl.fromTo(
        mountainFrontRef.current,
        {
          yPercent: 70,
        },
        {
          yPercent: 20,
          duration: 0.25,
          ease: "power1.out",
        },
      );
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 200,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          ease: "power2.out",
        },
        "<",
      );
    },
    { scope: sectionRef },
  );
};

export default useHimalayaAnimation;
