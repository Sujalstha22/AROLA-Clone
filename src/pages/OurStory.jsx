import React, { useRef } from 'react';
import waterdrop from '../assets/water-drop.gif';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
const OurStory = () => {
  const waterDropRef = useRef();
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.to(waterDropRef, {
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
      },
    });
  });

  return (
    <div className="relative">
      <div className="flex min-h-screen flex-col items-center justify-center font-[font]">
        <h2 className="text-3xl text-blue-800 uppercase">
          Welcome to the world of
        </h2>
        <h1 className="font-[font-bold] text-9xl font-bold text-blue-900 uppercase">
          {' '}
          AROLA
        </h1>
        <p className="text-center text-blue-800">
          Born from the desire to bring natural purity into modern living, our
          products are <br />
          crafted to elevate everyday hydration into a mindful ritual.
        </p>

        <div
          ref={waterDropRef}
          className="absolute top-[41vh] left-[48vw] z-10 h-20 w-20"
        >
          <img src={waterdrop} alt="water-drop" />
        </div>
      </div>
      <div className="flex">
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default OurStory;
