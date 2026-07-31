import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useBottleAnimation = ({ refs, heroRef, whyUsRef, himalayaRef }) => {
  const { positionRef, groupRef, capClosedRef, capGlowRef } = refs;

  useGSAP(() => {
    gsap.set(positionRef.current, {
      zIndex: 2,
    });
    gsap.set(groupRef.current, {
      scale: 0.7,
      transformOrigin: "center bottom",
    });

    gsap.set(capClosedRef.current, {
      opacity: 1,
    });

    gsap.set(capGlowRef.current, {
      opacity: 0,
      y: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1.5,
      },
    });

    tl.to(groupRef.current, {
      y: 50,
      duration: 0.5,
      ease: "none",
    });

    tl.set(
      capClosedRef.current,
      {
        opacity: 0,
      },
      ">-0.1",
    );

    tl.set(
      capGlowRef.current,
      {
        opacity: 1,
      },
      "<",
    );

    tl.to(
      capGlowRef.current,
      {
        y: -330,
        duration: 0.45,
        ease: "power2.out",
      },
      "<",
    );

    tl.to({}, { duration: 0.5 });

    tl.to(groupRef.current, {
      y: 35,
      scale: 0.7,
      duration: 0.7,
      ease: "power2.in",
    });

    tl.to(
      capGlowRef.current,
      {
        y: 0,
        duration: 0.7,
        ease: "power2.in",
      },
      "<",
    );

    tl.set(
      capGlowRef.current,
      {
        opacity: 0,
      },
      ">-0.1",
    );

    tl.set(
      capClosedRef.current,
      {
        opacity: 1,
      },
      "<",
    );
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: whyUsRef.current,
        start: "top center",
        end: "top 20%",
        scrub: true,
      },
    });
    transitionTl.to(positionRef.current, {
      y: -200,
      duration: 1.5,
      ease: "none",
    });
    transitionTl.to(
      groupRef.current,
      {
        scale: 1.01,
        duration: 1.5,
        ease: "none",
      },
      "<",
    );
    ScrollTrigger.create({
      trigger: himalayaRef.current,
      start: "top -=100",

      onEnter: () => {
        gsap.set(positionRef.current, {
          zIndex: 5,
        });
      },
    });
    const himalayaBottle = gsap.timeline({
      scrollTrigger: {
        trigger: himalayaRef.current,
        start: "top top",
        end: "center 20%",
        scrub: 1,
      },
    });
    himalayaBottle.to(
      groupRef.current,
      {
        y: 320,
        rotation: -8,
        scale: 0.2,
        ease: "none",
      },
      0,
    );
    himalayaBottle.to(groupRef.current, {
      opacity: 0,
      ease: "none",
    });
  });
};

export default useBottleAnimation;
