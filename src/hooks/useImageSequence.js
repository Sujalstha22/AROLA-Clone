import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

const useImageSequence = (sectionRef, canvasRef, rippleRef) => {
  const imagesRef = useRef([]);
  const sequenceRef = useRef({ frame: 0 });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      const images = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();

        img.src = `/frames/${i + 1}.webp`;

        await new Promise((resolve, reject) => {
          img.onload = resolve;

          img.onerror = () => {
            reject(new Error(`Failed to load frame ${i + 1}`));
          };
        });

        images[i] = img;

        console.log(`Loaded frame ${i + 1}/${FRAME_COUNT}`);
      }

      if (!cancelled) {
        imagesRef.current = images;
        setImagesLoaded(true);

        console.log('ALL FRAMES LOADED');
      }
    };

    loadImages().catch((error) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!imagesLoaded) {
        console.log('Waiting for images...');
        return;
      }

      const canvas = canvasRef.current;
      const section = sectionRef.current;
      const ripple = rippleRef.current;

      if (!canvas || !section) {
        console.log('Missing canvas or section');
        return;
      }

      const ctx = canvas.getContext('2d');

      const images = imagesRef.current;
      const sequence = sequenceRef.current;

      const render = () => {
        const frame = Math.round(sequence.frame);

        const image = images[frame];

        if (!image) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        if (!imageWidth || !imageHeight) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const canvasRatio = canvasWidth / canvasHeight;

        const imageRatio = imageWidth / imageHeight;

        let drawWidth;
        let drawHeight;

        if (imageRatio > canvasRatio) {
          drawHeight = canvasHeight;

          drawWidth = imageWidth * (canvasHeight / imageHeight);
        } else {
          drawWidth = canvasWidth;

          drawHeight = imageHeight * (canvasWidth / imageWidth);
        }

        const x = (canvasWidth - drawWidth) / 2;

        const y = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(image, x, y, drawWidth, drawHeight);
      };

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        render();
      };

      resizeCanvas();

      window.addEventListener('resize', resizeCanvas);

      sequence.frame = 0;

      render();

      if (ripple) {
        gsap.set(ripple, {
          opacity: 0,
        });
      }

      const tween = gsap.to(sequence, {
        frame: FRAME_COUNT - 1,

        ease: 'none',

        scrollTrigger: {
          trigger: section,

          start: 'top top',

          end: '+=4000',

          scrub: 1,

          pin: true,

          pinSpacing: true,

          markers: true,

          refreshPriority: 10,

          onUpdate: (self) => {
            const progress = self.progress;
            const sequenceProgress = gsap.utils.clamp(0, 1, progress / 0.82);

            sequence.frame = sequenceProgress * (FRAME_COUNT - 1);

            render();

            const rippleProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.8) / 0.18,
            );

            if (ripple) {
              ripple.style.opacity = `${rippleProgress}`;
            }

            canvas.style.opacity = `${1 - rippleProgress}`;

            console.log({
              progress,
              sequenceProgress,
              rippleProgress,
            });
          },
        },
      });

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        tween.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === section) {
            trigger.kill();
          }
        });
      };
    },
    {
      dependencies: [imagesLoaded],
      scope: sectionRef,
    },
  );
};

export default useImageSequence;
