import background from "../../assets/negazirana-rock.png";
import bottle from "../../assets/blue-spring-bottle-front.png";
import waterfall from "../../assets/negazirana-waterfall.gif";
import treeLeft from "../../assets/banner-tree-left.png";
import treeRight from "../../assets/banner-tree-right.png";
import bannerBush from "../../assets/negazirana-bush-bottom.png";
import backgroundBush from "../../assets/banner-bush.png";

const BottleShowcase = () => {
  return (
    <section
      className="relative h-screen bg-black "
      style={{
        backgroundImage: `url(${backgroundBush})`,
      }}
    >
      {/* Background */}
      <img
        src={background}
        alt=""
        className="absolute inset-0  left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2 object-cover"
      />

      <img
        src={waterfall}
        alt=""
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[30vw]
          max-w-[500px]
          min-w-[220px]
          z-10
          pointer-events-none
          select-none
        "
      />

      {/* Bottle */}
      <img
        src={bottle}
        alt=""
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[280vw]
          max-w-[550px]
          min-w-[120px]
          z-20
          pointer-events-none
          select-none
        "
      />

      {/* Left Tree */}
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
        "
      />
      <h1
        className="absolute  left-1/2
          top-1/2
          -translate-x-1/2
          translate-y-[170px] text-white text-3xl font-bold z-50"
      >
        {" "}
        BLUE SPRING{" "}
      </h1>
      {/* Bottom Bush Strip */}
      <div
        className="absolute -bottom-10 left-[150px] w-600 h-[50vh] z-40 bg-no-repeatrepeat bg-bottom pointer-events-none"
        style={{
          backgroundImage: `url(${bannerBush})`,
          backgroundSize: "auto 100%",
        }}
      />
      <div
        className="absolute -bottom-10  w-400 h-[50vh] z-30 bg-no-repeatrepeat bg-bottom pointer-events-none"
        style={{
          backgroundImage: `url(${bannerBush})`,
          backgroundSize: "auto 100%",
        }}
      />
    </section>
  );
};

export default BottleShowcase;
