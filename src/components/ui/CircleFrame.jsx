const CircleFrame = ({ children, circleWrapperRef, circleStrokeRef }) => {
  return (
    <div
      ref={circleWrapperRef}
      className="
        relative
        w-[70vw] h-[70vw]
        sm:w-[60vw] sm:h-[60vw]
        md:w-[50vw] md:h-[50vw]
        lg:w-[40vw] lg:h-[40vw]
        xl:w-[60vh] xl:h-[60vh]
      "
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
        <circle
          ref={circleStrokeRef}
          cx="250"
          cy="250"
          r="225"
          fill="none"
          stroke="#002685"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircleFrame;
