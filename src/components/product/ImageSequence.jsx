import { useRef } from 'react';
import useImageSequence from '../../hooks/useImageSequence';
import WaterRipple from '../WaterRipple/WaterRipple';

const ImageSequence = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const rippleRef = useRef(null);

  useImageSequence(sectionRef, canvasRef, rippleRef);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div ref={rippleRef} className="absolute inset-0 z-30 opacity-0">
        <WaterRipple
          image="/frames/240.webp"
          rippleStrength={1.5}
          distortionStrength={0.35}
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-20 h-full w-full" />
    </section>
  );
};

export default ImageSequence;
