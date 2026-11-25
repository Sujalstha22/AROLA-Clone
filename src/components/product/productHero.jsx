import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../../data/Product.js';
gsap.registerPlugin(ScrollTrigger);

const ProductHero = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [previousIndex, setPreviousIndex] = useState(null);

  const sectionRef = useRef(null);
  const bottleContainerRef = useRef(null);
  const currentBottleRef = useRef(null);
  const previousBottleRef = useRef(null);
  const contentRef = useRef(null);

  const activeProduct = products[activeIndex];

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  const changeProduct = (index) => {
    if (index === activeIndex) return;

    const direction = index > activeIndex ? 1 : -1;

    setPreviousIndex(activeIndex);
    setActiveIndex(index);

    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.set(contentRef.current, {
        opacity: 0,
      });

      tl.fromTo(
        previousBottleRef.current,
        {
          x: 0,
          opacity: 1,
        },
        {
          x: direction * -180,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        0,
      );

      tl.fromTo(
        currentBottleRef.current,
        {
          x: direction * 180,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.1,
      );

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.15',
      );

      tl.call(() => {
        setPreviousIndex(null);
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#002684] text-white"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-center gap-10 px-6 py-16 lg:grid-cols-3 lg:gap-20 lg:px-12 lg:py-24">
        <div
          ref={bottleContainerRef}
          className="relative flex h-[55vh] w-full items-center justify-center overflow-hidden lg:h-[70vh]"
        >
          {previousIndex !== null && (
            <img
              ref={previousBottleRef}
              src={products[previousIndex].image}
              alt=""
              className="pointer-events-none absolute h-[90%] max-h-[750px] w-auto max-w-[90%] object-contain drop-shadow-2xl lg:h-[95%]"
            />
          )}

          <img
            ref={currentBottleRef}
            src={activeProduct.image}
            alt={activeProduct.name}
            className="absolute h-[90%] max-h-[750px] w-auto max-w-[90%] object-contain drop-shadow-2xl lg:h-[95%]"
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 w-full min-w-0 text-center lg:text-left"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.25em] text-blue-400 uppercase md:text-sm">
                {activeProduct.category}
              </span>

              <h2 className="text-4xl leading-tight md:text-6xl lg:text-7xl">
                {activeProduct.name}
              </h2>
            </div>

            <p className="hidden max-w-2xl text-lg leading-relaxed text-zinc-300 lg:block">
              {activeProduct.description}
            </p>

            <div className="space-y-8 border-t border-white/20 pt-6">
              <div className="flex items-center justify-center gap-8 lg:justify-start">
                {/* PRICE */}
                <div className="space-y-2">
                  <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    Price
                  </p>

                  <p className="text-2xl font-bold lg:text-3xl">
                    {activeProduct.price}
                  </p>
                </div>

                <div className="h-10 w-px bg-white/20" />

                {/* SIZE */}
                <div className="space-y-2">
                  <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    Size
                  </p>

                  <p className="text-lg font-bold">{activeProduct.size}</p>
                </div>
              </div>

              {/* VIEW DETAILS */}
              <button className="group relative overflow-hidden rounded-full border-2 border-white px-8 py-3 text-base transition-all duration-500 hover:text-black">
                <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />

                <span className="relative z-10">View Details</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-3 place-items-center gap-5 lg:gap-8">
          {products.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={product.id}
                onClick={() => changeProduct(index)}
                className={`relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full p-3 transition-all duration-500 lg:size-24 ${
                  isActive
                    ? 'scale-110 border-2 border-white bg-white/20'
                    : 'border-2 border-white/10 bg-white/5 hover:border-white/40'
                } `}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full object-contain drop-shadow-lg transition-transform duration-500 ${isActive ? 'scale-110' : ''} `}
                />

                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
