import { useRef } from "react";
import useWhyUsAnimation from "./useWhyUsAnimation";
import whyUsVideo from "../../assets/why-us.mp4";

const paragraph = `In the high silence of the Himalayas, where earth rises above the clouds and time moves slowly, Arola begins. Before cities. Before industry. Before compromise. High in Nepal, near the presence of Mount Everest, snow rests for years in air that is thin, clean, and untouched. When it melts, gravity carries it through layers of ancient Himalayan rock, a natural filtration process shaped over millions of years. By the time it reaches the spring, it has been refined by altitude, mineralized by stone, and protected by isolation. We do not create this purity. We preserve it. Arola stands for elevation, not only in geography, but in standard.`;

const WhyUs = ({ whyUsRef }) => {
  const paragraphRef = useRef(null);
  const videoRef = useRef(null);

  useWhyUsAnimation({
    sectionRef: whyUsRef,
    paragraphRef,
    videoRef,
  });

  return (
    <section ref={whyUsRef} className="relative min-h-screen overflow-hidden">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[52%_48%]">
        {/* Left Video */}
        <div
          className="relative
    h-[45vh]
    lg:absolute
    lg:inset-y-0
    lg:left-0
    lg:h-full
    lg:w-[52%]"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={whyUsVideo} type="video/mp4" />
          </video>
        </div>

        {/* Right Blue Panel */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[48%] bg-[#00134B]" />

        {/* Text */}
        <div
          className="
           relative
  
    bg-[#00134B]

    px-6
    py-10

    lg:absolute
    lg:right-0
    lg:top-1/2
    lg:w-[42%]
    lg:-translate-y-1/2
    lg:px-7
        "
        >
          <h2
            className="
mb-6
text-3xl
sm:text-4xl
lg:text-5xl
font-medium
text-white
"
          >
            Why Arola?
          </h2>

          <p
            ref={paragraphRef}
            className="
text-white
text-sm
sm:text-base
lg:text-md
leading-relaxed
font-light
"
          >
            {paragraph.split(" ").map((word, index) => (
              <span key={index} className="word inline-block select-none">
                {word}&nbsp;
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
