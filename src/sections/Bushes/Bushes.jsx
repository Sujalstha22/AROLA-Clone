import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import bushCurtain from "../../assets/bushes.png";
import background from "../../assets/bottle-bg.png";
import butterflyGif from "../../assets/butterfly.gif";
import treeLeft from "../../assets/banner-tree-left.png";
import treeRight from "../../assets/banner-tree-right.png";
import Logo from "../../assets/lightLogo.png";
import bannerBush from "../../assets/banner-bush.png";
const Bushes = ({ bushRef }) => {
  const curtainRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bushRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.to(curtainRef.current, {
      yPercent: 105,
      ease: "none",
    });
  }, []);

  return (
    <section ref={bushRef} className="relative h-[100svh] bg-grey">
      <div className="relative h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* Background */}
          <img
            src={background}
            alt=""
            className=" w-full h-full object-contain pointer-events-none select-none "
          />

          {/* Center Logo */}
          <img
            src={Logo}
            alt="Arola Logo"
            className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 md:w-28 lg:w-32 h-auto pointer-events-none select-none "
          />
        </div>
        <img
          src={treeLeft}
          className=" absolute left-0 bottom-0 h-full w-auto z-10 pointer-events-none "
        />

        <img
          src={treeRight}
          className=" absolute right-0 bottom-0 h-full w-auto z-10 pointer-events-none "
        />
        {/* Bottom Bush Strip */}
        <div
          className="absolute -bottom-25 left-[150px] w-600 h-[50vh] z-40 bg-no-repeatrepeat bg-bottom pointer-events-none"
          style={{
            backgroundImage: `url(${bannerBush})`,
            backgroundSize: "auto 100%",
          }}
        />
        <div
          className="absolute -bottom-22  w-400 h-[50vh] z-30 bg-no-repeatrepeat bg-bottom pointer-events-none"
          style={{
            backgroundImage: `url(${bannerBush})`,
            backgroundSize: "auto 100%",
          }}
        />
        {/* Butterfly */}
        <img
          src={butterflyGif}
          alt=""
          className=" absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[16vw] max-w-[220px] min-w-[110px] h-auto z-30 pointer-events-none select-none
      "
        />

        {/* Bush Curtain */}
        <img
          ref={curtainRef}
          src={bushCurtain}
          alt=""
          className=" absolute inset-0 w-screen h-[140vh] object-fill object-center z-50 pointer-events-none select-none "
        />
      </div>
    </section>
  );
};

export default Bushes;
