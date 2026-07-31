import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const useNavbarAnimation = (navbarRef) => {
  useGSAP(() => {
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      if (current < lastScroll && current > 50) {
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else if (current > lastScroll) {
        gsap.to(navbarRef.current, {
          y: -100,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
};

export default useNavbarAnimation;
