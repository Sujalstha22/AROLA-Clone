import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useWhyUsAnimation = ({ sectionRef, paragraphRef, videoRef }) => {
  useGSAP(
    () => {
      gsap.set(paragraphRef.current.children, {
        color: "#5B6B9C",
        opacity: 0.2,
        y: 20,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "top 20%",
          scrub: 2,
        },
      });

      tl.to(
        videoRef.current,
        {
          scale: 1,
          opacity: 1,
          ease: "none",
        },
        0,
      );

      // Paragraph reveal
      tl.to(
        paragraphRef.current.children,
        {
          color: "#fff",
          opacity: 1,
          stagger: {
            each: 0.04,
          },
          ease: "none",
        },
        0.2,
      );
    },
    {
      scope: sectionRef,
    },
  );
};

export default useWhyUsAnimation;
