import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import stream from "../../assets/stream.png";
import streamBranch from "../../assets/stream-branch.png";
import treeLeft from "../../assets/banner-tree-left.png";
import treeRight from "../../assets/banner-tree-right.png";
import bannerBush from "../../assets/banner-bush.png";

const Jungle = ({ jungleRef }) => {
  const streamRefImg = useRef();
  const branchRef = useRef();

  useGSAP(() => {
    gsap.to(streamRefImg.current, {
      y: -20,
      scale: 1.03,
      ease: "none",
      scrollTrigger: {
        trigger: jungleRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.fromTo(
      branchRef.current,
      {
        xPercent: -8,
      },
      {
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: jungleRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <section
      ref={jungleRef}
      className="relative h-screen overflow-hidden bg-[#0b1e4d]"
    >
      <img
        src={bannerBush}
        alt=""
        className="absolute top-0 left-0 w-full h-auto z-40 pointer-events-none select-none"
      />
      {/* Top Bush Strip - Layer 1 */}
      <div
        className="absolute -top-10  w-[600px] h-[50vh] z-2 pointer-events-none"
        style={{
          backgroundImage: `url(${bannerBush})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Top Bush Strip - Layer 2 */}
      <div
        className="absolute -top-10  w-[400px] h-[50vh] z-2 pointer-events-none"
        style={{
          backgroundImage: `url(${bannerBush})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top",
          backgroundSize: "auto 100%",
        }}
      />
      <img
        ref={streamRefImg}
        src={stream}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          z-0
          pointer-events-none
          select-none
        "
      />
      {/* Branch */}
      <img
        ref={branchRef}
        src={streamBranch}
        alt=""
        className="
          absolute
          left-1/2
          top-[48%]
          -translate-x-1/2
          -translate-y-1/2
          w-[75%]
          max-w-none
          h-auto
          z-230
          pointer-events-none
          select-none
        "
      />

      <img
        src={treeLeft}
        alt=""
        className="
          absolute
          left-0
          bottom-0
          h-full
          w-auto
          z-30
          pointer-events-none
          select-none
        "
      />
      {/* Right Tree */}
      <img
        src={treeRight}
        alt=""
        className="
          absolute
          right-0
          bottom-0
          h-full
          w-auto
          z-30
          pointer-events-none
          select-none
        "
      />
    </section>
  );
};

export default Jungle;
