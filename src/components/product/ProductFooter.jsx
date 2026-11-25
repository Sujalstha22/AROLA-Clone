import React from 'react';
import WaterRipple from '../WaterRipple/WaterRipple';

const ProductFooter = () => {
  return (
    <section className="bg- relative h-screen w-full overflow-hidden">
      <div className="to pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-[#04263f]">
        <img
          src="darkLogo.png"
          alt="Arola"
          className="h-auto w-[60vw] max-w-[900px] object-contain"
        />
      </div>
      <div className="absolute inset-0 z-0">
        <WaterRipple
          image="sea-bed-footer.png"
          rippleStrength={2}
          distortionStrength={0.35}
        />
      </div>
    </section>
  );
};

export default ProductFooter;
