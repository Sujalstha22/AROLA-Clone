import React, { useRef } from "react";
import Footer from "../components/layout/Footer";
import Hero from "../sections/Hero/Hero";
import Bottle from "../components/Bottle/Bottle";
import useBottleAnimation from "../hooks/useBottleAnimation";
import WhyUs from "../sections/Whyus/WhyUs";
import Himalaya from "../sections/Himalaya/Himalaya";
import Waterfall from "../sections/waterfall/Waterfall";
import Bushes from "../sections/Bushes/Bushes";
import BottleShowcase from "../sections/BottleShowcase/BottleShowcase";
import Jungle from "../sections/Jungle/Jungle";
import PeakFlowShowcase from "../sections/PeakFlowShowcase/PeakFlowShowcase";

const Home = () => {
  // const navbarRef = useRef(null);
  const heroRef = useRef(null);
  const whyUsRef = useRef(null);
  const himalayaRef = useRef(null);
  const bushRef = useRef(null);
  const jungleRef = useRef(null);
  const bottleRefs = {
    positionRef: useRef(null),
    groupRef: useRef(null),
    bodyRef: useRef(null),
    capClosedRef: useRef(null),
    capGlowRef: useRef(null),
  };
  useBottleAnimation({
    refs: bottleRefs,
    heroRef,
    whyUsRef,
    himalayaRef,
  });
  // useNavbarAnimation(navbarRef);
  return (
    <div className="relative">
      {/* <Navbar navbarRef={navbarRef} /> */}
      <Bottle refs={bottleRefs} />
      <Hero heroRef={heroRef} />
      <WhyUs whyUsRef={whyUsRef} />
      <Himalaya himalayaRef={himalayaRef} />
      <Waterfall />
      <Bushes bushRef={bushRef} />
      <BottleShowcase />
      <Jungle jungleRef={jungleRef} />
      <PeakFlowShowcase />
      <Footer />
    </div>
  );
};

export default Home;
