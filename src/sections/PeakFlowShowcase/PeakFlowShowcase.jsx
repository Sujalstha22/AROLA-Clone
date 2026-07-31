import background from "../../assets/banner-bush.png";
import bottle from "../../assets/peak-flow-bottle.png";
import moss from "../../assets/moss.png";
import fern from "../../assets/vitaminska-fern.png";
import rock from "../../assets/vitaminska-rock.png";

const PeakFlowShowcase = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-[#021102]">
      {/* Background */}
      <img
        src={background}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          pointer-events-none
          select-none
        "
      />

      {/* Rock */}
      <img
        src={rock}
        alt=""
        className="
          absolute
          left-1/2
          bottom-[8%]
          -translate-x-1/2
          w-[26vw]
          max-w-[420px]
          min-w-[250px]
          z-20
          pointer-events-none
          select-none
        "
      />
      <img
        src={bottle}
        alt=""
        className="
          absolute
          left-1/2
          top-[42%]
          -translate-x-1/2
          -translate-y-1/2
          w-[100vw]
          max-w-[520px]
          min-w-[120px]
          z-30
          pointer-events-none
          select-none
        "
      />
      <img
        src={moss}
        alt=""
        className="
          absolute
          left-0
          bottom-0
          w-[38vw]
          max-w-[650px]
          z-40
          pointer-events-none
          select-none
        "
      />

      {/* Fern */}
      <img
        src={fern}
        alt=""
        className="
          absolute
          right-0
          bottom-0
          w-[40vw]
          max-w-[700px]
          z-40
          pointer-events-none
          select-none
        "
      />

      {/* Bottom Bush */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[110px] bg-[#123a14]/70 blur-2xl rounded-full z-40" />

      {/* Title */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-center">
        <h1 className="text-white font-black text-5xl tracking-tight uppercase">
          PEAKFLOW
        </h1>
      </div>
    </section>
  );
};

export default PeakFlowShowcase;
