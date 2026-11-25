import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import CircleFrame from '../../ui/CircleFrame';
import Bottle from '../../ui/Bottle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const heroRef = useRef();
  const whyusRef = useRef();
  const waterRef = useRef();
  // bottle references
  const bottleRef = useRef();
  const bottleGroupRef = useRef();
  const capClosedRef = useRef();
  const capGlowRef = useRef();
  // herso section references
  const sectionRef = useRef();
  const circleWrapperRef = useRef();
  const circleStrokeRef = useRef();
  const scrollTextRef = useRef();
  const welcomeTextRef = useRef();
  //whyus section references
  const paragraphRef = useRef();
  const videoRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=4500',
          pin: true,
          scrub: 1.5,
          markers: true,
        },
      });
      gsap.set(bottleGroupRef.current, {
        scale: 0.7,
        transformOrigin: 'center bottom',
      });
      gsap.set(videoRef.current, {
        x: -220,
        scale: 1.15,
        opacity: 0,
      });

      gsap.set(paragraphRef.current, {
        opacity: 0.2,
        color: '#5B6B9C',
        y: 30,
      });

      gsap.set(whyusRef.current, {
        opacity: 0,
      });

      tl.add('intro')

        .to(
          scrollTextRef.current,
          {
            opacity: 0,
            y: 80,
            duration: 1.5,
            ease: 'none',
          },
          'intro',
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
            duration: 1.5,
            ease: 'none',
          },
          'intro',
        )

        .to(
          circleWrapperRef.current,
          {
            scale: 1.5,
            duration: 1.5,
            ease: 'none',
          },
          'intro',
        )

        .to(
          circleStrokeRef.current,
          {
            attr: {
              'stroke-width': 10,
            },
            duration: 1.5,
            ease: 'none',
          },
          'intro',
        )

        .to(
          bottleGroupRef.current,
          {
            y: 100,
            duration: 1.5,
            ease: 'none',
          },
          'intro',
        )

        .set(
          capClosedRef.current,
          {
            opacity: 0,
          },
          'intro+=0.55',
        )

        .set(
          capGlowRef.current,
          {
            opacity: 1,
          },
          'intro+=0.55',
        )

        .to(
          capGlowRef.current,
          {
            y: -180,
            duration: 0.45,
            ease: 'power2.out',
          },
          'intro+=0.55',
        )

        .to(
          {},
          {
            duration: 0.25,
          },
        )

        .add('closeBottle')

        .to(
          bottleGroupRef.current,
          {
            y: 65,
            scale: 0.7,
            duration: 0.7,
            ease: 'power2.in',
          },
          'closeBottle',
        )

        .to(
          capGlowRef.current,
          {
            y: 0,
            duration: 0.7,
            ease: 'power2.in',
          },
          'closeBottle',
        )

        .set(
          capGlowRef.current,
          {
            opacity: 0,
          },
          'closeBottle+=0.6',
        )

        .set(
          capClosedRef.current,
          {
            opacity: 1,
          },
          'closeBottle+=0.6',
        );

      // ==========================================================
      // HERO -> WHY US
      // ==========================================================

      tl.add('transition')

        .to(
          heroRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'none',
          },
          'transition',
        )

        .to(
          whyusRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'none',
          },
          'transition+=0.2',
        )

        .to(
          bottleGroupRef.current,
          {
            x: -330,
            y: 20,
            scale: 1,
            duration: 1.2,
            ease: 'none',
          },
          'transition',
        );

      tl.add('whyUs')

        .to(
          videoRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          'whyUs',
        )

        .fromTo(
          paragraphRef.current,
          {
            opacity: 0.2,
            y: 30,
            color: '#5B6B9C',
          },
          {
            opacity: 1,
            y: 0,
            color: '#ffffff',
            duration: 1.2,
            ease: 'none',
          },
          'whyUs+=0.2',
        );
    },
    { scope: sectionRef },
  );
  return (
    <section ref={sectionRef}>
      <section
        ref={heroRef}
        className="-top-10 flex h-screen items-center justify-center"
      >
        <CircleFrame
          circleWrapperRef={circleWrapperRef}
          circleStrokeRef={circleStrokeRef}
        >
          <h2
            ref={scrollTextRef}
            className="sm:text-md absolute px-6 text-center text-xl leading-tight font-semibold text-[#002685] md:text-lg lg:text-xl xl:mb-35 xl:text-xl"
          >
            PLEASE,
            <br />
            SCROLL DOWN
          </h2>

          <h2
            ref={welcomeTextRef}
            className="absolute px-6 text-center text-xl leading-tight font-semibold text-[#002685] opacity-0 sm:text-lg md:text-lg lg:text-xl xl:text-xl"
          >
            WELCOME TO AROLA
          </h2>
        </CircleFrame>
      </section>

      {/*  why us section  */}

      <section
        ref={whyusRef}
        className="relative z-20 -mt-[10vh] flex min-h-screen items-center bg-[#00134B]"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid items-center gap-30 lg:grid-cols-2">
            {/* LEFT */}

            <div className="relative flex justify-center">
              {/* Video */}

              <div
                ref={videoRef}
                className="relative z-10 aspect-[4/5] w-full max-w-[560px] overflow-hidden"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="WHYUS.mp4" />
                </video>
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <h2 className="mb-8 text-4xl leading-none font-medium text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl">
                Why Arola?
              </h2>

              <p
                ref={paragraphRef}
                className="mt-8 max-w-2xl text-lg leading-[1.7] text-white/25"
              >
                In the high silence of the Himalayas, where earth rises above
                the clouds and time moves slowly, Arola begins. Before cities.
                Before industry. Before compromise. High in Nepal, near the
                presence of Mount Everest, snow rests for years in air that is
                thin, clean, and untouched. When it melts, gravity carries it
                through layers of ancient Himalayan rock, a natural filtration
                process shaped over millions of years. By the time it reaches
                the spring, it has been refined by altitude, mineralized by
                stone, and protected by isolation. We do not create this purity.
                We preserve it. Arola stands for elevation, not only in
                geography, but in standard.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section ref={waterRef} className="min-h-screen bg-[#0D1F68]"></section>
      <section ref={waterRef} className="min-h-screen bg-[#0D1F68]"></section>
      <div
        ref={bottleGroupRef}
        className="pointer-events-none absolute bottom-[6vh] left-1/2 z-50 flex -translate-x-1/2 justify-center"
      >
        <Bottle
          bottleGroupRef={bottleGroupRef}
          bottleRef={bottleRef}
          capClosedRef={capClosedRef}
          capGlowRef={capGlowRef}
        />
      </div>
    </section>
  );
};

export default Hero;
