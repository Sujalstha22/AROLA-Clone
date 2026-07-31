import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bottle from "../../ui/Bottle";

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef();

  const headingRef = useRef();
  const paragraphRef = useRef();
  const videoRef = useRef();

  const bottleGroupRef = useRef();
  const bottleRef = useRef();
  const capClosedRef = useRef();
  const capGlowRef = useRef();

  useGSAP(() => {
    gsap.set(bottleGroupRef.current, {
      y: 65,
      scale: 0.7,
      visibility: "hidden",
    });

    gsap.set(capClosedRef.current, {
      opacity: 1,
      scale: 0.7,
      y: 25,
    });

    gsap.set(capGlowRef.current, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top ",
        end: "top 20%",
        scrub: 1.5,
        markers: true,
      },
    });
    tl.set(
      bottleGroupRef.current,
      {
        visibility: "visible",
      },
      0,
    );
    tl.add("intro")

      // Bottle fades in
      .to(
        bottleGroupRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "none",
        },
        "intro",
      )

      // Bottle rises
      .to(
        bottleGroupRef.current,
        {
          y: 20,
          scale: 1,
          ease: "none",
        },
        "intro",
      )

      // Video reveal
      .fromTo(
        videoRef.current,
        {
          x: -120,
          scale: 1.12,
        },
        {
          x: 0,
          scale: 1,
          ease: "none",
        },
        "intro",
      )

      // Heading
      .fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
        },
        "intro+=0.05",
      )

      // Paragraph
      .fromTo(
        paragraphRef.current,
        {
          y: 30,
          opacity: 0.25,
          color: "#5B6B9C",
        },
        {
          y: 0,
          opacity: 1,
          color: "#ffffff",
          ease: "none",
        },
        "intro+=0.15",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        -mt-[10vh]
        min-h-screen
        bg-[#00134B]
        flex
        items-center
        z-20
      "
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-30 items-center">
          {/* LEFT */}

          <div className="relative flex justify-center">
            {/* Video */}

            <div
              ref={videoRef}
              className="
                relative
                z-10
                w-full
                max-w-[560px]
                aspect-[4/5]
                overflow-hidden
              "
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="WHYUS.mp4" />
              </video>
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <h2
              ref={headingRef}
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-6xl
                xl:text-6xl
                font-medium
                text-white
                leading-none
                mb-8
              "
            >
              Why Arola?
            </h2>

            <p
              ref={paragraphRef}
              className="
                mt-8
                text-lg
                leading-[1.7]
                text-white/25
                max-w-2xl
              "
            >
              In the high silence of the Himalayas, where earth rises above the
              clouds and time moves slowly, Arola begins. Before cities. Before
              industry. Before compromise. High in Nepal, near the presence of
              Mount Everest, snow rests for years in air that is thin, clean,
              and untouched. When it melts, gravity carries it through layers of
              ancient Himalayan rock, a natural filtration process shaped over
              millions of years. By the time it reaches the spring, it has been
              refined by altitude, mineralized by stone, and protected by
              isolation. We do not create this purity. We preserve it. Arola
              stands for elevation, not only in geography, but in standard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
