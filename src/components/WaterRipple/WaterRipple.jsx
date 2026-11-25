import { useEffect, useRef } from 'react';

import {
  vertexShader,
  simulationFragmentShader,
  displayFragmentShader,
} from './shader';

const WaterRipple = ({
  image,
  className = '',
  rippleStrength = 1.2,
  distortionStrength = 0.035,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // ========================================================
    // WEBGL2
    // ========================================================

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });

    if (!gl) {
      console.error('WebGL2 is not supported by this browser.');

      return;
    }

    // ========================================================
    // FLOAT FRAMEBUFFER SUPPORT
    // ========================================================

    const floatExtension = gl.getExtension('EXT_color_buffer_float');

    if (!floatExtension) {
      console.error('EXT_color_buffer_float is not supported.');

      return;
    }

    // ========================================================
    // SHADER COMPILATION
    // ========================================================

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);

      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);

        return null;
      }

      return shader;
    };

    const createProgram = (vertexSource, fragmentSource) => {
      const vertex = compileShader(gl.VERTEX_SHADER, vertexSource);

      const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

      if (!vertex || !fragment) {
        return null;
      }

      const program = gl.createProgram();

      gl.attachShader(program, vertex);

      gl.attachShader(program, fragment);

      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));

        gl.deleteProgram(program);

        return null;
      }

      gl.deleteShader(vertex);
      gl.deleteShader(fragment);

      return program;
    };

    // ========================================================
    // CREATE PROGRAMS
    // ========================================================

    const simulationProgram = createProgram(
      vertexShader,
      simulationFragmentShader,
    );

    const displayProgram = createProgram(vertexShader, displayFragmentShader);

    if (!simulationProgram || !displayProgram) {
      return;
    }

    // ========================================================
    // FULLSCREEN QUAD
    // ========================================================

    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,

      -1, 1, 1, -1, 1, 1,
    ]);

    const uvs = new Float32Array([
      0, 0, 1, 0, 0, 1,

      0, 1, 1, 0, 1, 1,
    ]);

    // --------------------------------------------------------
    // POSITION BUFFER
    // --------------------------------------------------------

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // --------------------------------------------------------
    // UV BUFFER
    // --------------------------------------------------------

    const uvBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

    // ========================================================
    // ATTRIBUTE LOCATIONS
    // ========================================================

    const simulationPositionLocation = gl.getAttribLocation(
      simulationProgram,
      'a_position',
    );

    const simulationUvLocation = gl.getAttribLocation(
      simulationProgram,
      'a_uv',
    );

    const displayPositionLocation = gl.getAttribLocation(
      displayProgram,
      'a_position',
    );

    const displayUvLocation = gl.getAttribLocation(displayProgram, 'a_uv');

    // ========================================================
    // UNIFORM LOCATIONS
    // ========================================================

    const simulationPreviousLocation = gl.getUniformLocation(
      simulationProgram,
      'u_previous',
    );

    const simulationResolutionLocation = gl.getUniformLocation(
      simulationProgram,
      'u_resolution',
    );

    const simulationMouseLocation = gl.getUniformLocation(
      simulationProgram,
      'u_mouse',
    );

    const simulationMouseActiveLocation = gl.getUniformLocation(
      simulationProgram,
      'u_mouseActive',
    );

    const simulationMouseStrengthLocation = gl.getUniformLocation(
      simulationProgram,
      'u_mouseStrength',
    );

    const displayImageLocation = gl.getUniformLocation(
      displayProgram,
      'u_image',
    );

    const displayPressureLocation = gl.getUniformLocation(
      displayProgram,
      'u_pressure',
    );

    const displayPressureResolutionLocation = gl.getUniformLocation(
      displayProgram,
      'u_pressureResolution',
    );

    const displayDistortionLocation = gl.getUniformLocation(
      displayProgram,
      'u_distortionStrength',
    );

    // ========================================================
    // IMAGE TEXTURE
    // ========================================================

    const imageTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, imageTexture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // ========================================================
    // SIMULATION RESOLUTION
    // ========================================================

    const SIM_WIDTH = 512;
    const SIM_HEIGHT = 512;

    // ========================================================
    // CREATE SIMULATION TEXTURE
    // ========================================================

    const createSimulationTexture = () => {
      const texture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA16F,
        SIM_WIDTH,
        SIM_HEIGHT,
        0,
        gl.RGBA,
        gl.HALF_FLOAT,
        null,
      );

      return texture;
    };

    // ========================================================
    // CREATE FRAMEBUFFER
    // ========================================================

    const createFramebuffer = (texture) => {
      const framebuffer = gl.createFramebuffer();

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

      if (status !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('Framebuffer incomplete:', status);
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return framebuffer;
    };

    // ========================================================
    // CREATE TWO SIMULATION TEXTURES
    // ========================================================

    let currentTexture = createSimulationTexture();

    let nextTexture = createSimulationTexture();

    let currentFramebuffer = createFramebuffer(currentTexture);

    let nextFramebuffer = createFramebuffer(nextTexture);

    // ========================================================
    // INITIALIZE SIMULATION
    // ========================================================

    const clearFramebuffer = (framebuffer) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

      gl.viewport(0, 0, SIM_WIDTH, SIM_HEIGHT);

      gl.clearColor(0, 0, 0, 0);

      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    clearFramebuffer(currentFramebuffer);

    clearFramebuffer(nextFramebuffer);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // ========================================================
    // MOUSE STATE
    // ========================================================

    const mouse = {
      x: -100,
      y: -100,
      active: false,
      moved: false,
    };

    // ========================================================
    // MOUSE MOVE
    // ========================================================

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      // Convert canvas coordinates
      // to simulation coordinates.

      mouse.x = (x / rect.width) * SIM_WIDTH;

      mouse.y = ((rect.height - y) / rect.height) * SIM_HEIGHT;

      mouse.active = true;

      mouse.moved = true;
    };

    // ========================================================
    // MOUSE LEAVE
    // ========================================================

    const handleMouseLeave = () => {
      mouse.active = false;

      mouse.moved = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    canvas.addEventListener('mouseleave', handleMouseLeave);

    // ========================================================
    // RESIZE
    // ========================================================

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));

      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    window.addEventListener('resize', resize);

    // ========================================================
    // DRAW FULLSCREEN QUAD
    // ========================================================

    const drawQuad = (program, positionLocation, uvLocation) => {
      // Position

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      gl.enableVertexAttribArray(positionLocation);

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // UV

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

      gl.enableVertexAttribArray(uvLocation);

      gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    // ========================================================
    // IMAGE LOADING
    // ========================================================

    const img = new Image();

    img.crossOrigin = 'anonymous';

    let animationFrame = null;

    let destroyed = false;

    img.onload = () => {
      if (destroyed) return;

      gl.bindTexture(gl.TEXTURE_2D, imageTexture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      // Start animation

      render();
    };

    img.onerror = () => {
      console.error('Unable to load WaterRipple image:', image);
    };

    img.src = image;

    // ========================================================
    // RENDER LOOP
    // ========================================================

    const render = () => {
      if (destroyed) {
        return;
      }

      // ====================================================
      // PASS 1
      //
      // WATER SIMULATION
      // ====================================================

      gl.bindFramebuffer(gl.FRAMEBUFFER, nextFramebuffer);

      gl.viewport(0, 0, SIM_WIDTH, SIM_HEIGHT);

      gl.useProgram(simulationProgram);

      // Previous simulation texture

      gl.activeTexture(gl.TEXTURE0);

      gl.bindTexture(gl.TEXTURE_2D, currentTexture);

      gl.uniform1i(simulationPreviousLocation, 0);

      // Resolution

      gl.uniform2f(simulationResolutionLocation, SIM_WIDTH, SIM_HEIGHT);

      // Mouse

      gl.uniform2f(simulationMouseLocation, mouse.x, mouse.y);

      // Only inject ripple when mouse
      // actually moved.

      gl.uniform1f(simulationMouseActiveLocation, mouse.moved ? 1.0 : 0.0);

      gl.uniform1f(simulationMouseStrengthLocation, rippleStrength);

      drawQuad(
        simulationProgram,
        simulationPositionLocation,
        simulationUvLocation,
      );

      // ====================================================
      // SWAP TEXTURES
      // ====================================================

      const tempTexture = currentTexture;

      currentTexture = nextTexture;

      nextTexture = tempTexture;

      const tempFramebuffer = currentFramebuffer;

      currentFramebuffer = nextFramebuffer;

      nextFramebuffer = tempFramebuffer;

      // Mouse impulse happens for
      // one frame.

      mouse.moved = false;

      // ====================================================
      // PASS 2
      //
      // DISPLAY IMAGE
      // ====================================================

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(displayProgram);

      // ----------------------------------------------------
      // IMAGE
      // ----------------------------------------------------

      gl.activeTexture(gl.TEXTURE0);

      gl.bindTexture(gl.TEXTURE_2D, imageTexture);

      gl.uniform1i(displayImageLocation, 0);

      // ----------------------------------------------------
      // PRESSURE
      // ----------------------------------------------------

      gl.activeTexture(gl.TEXTURE1);

      gl.bindTexture(gl.TEXTURE_2D, currentTexture);

      gl.uniform1i(displayPressureLocation, 1);

      gl.uniform2f(displayPressureResolutionLocation, SIM_WIDTH, SIM_HEIGHT);

      // ----------------------------------------------------
      // DISTORTION
      // ----------------------------------------------------

      gl.uniform1f(displayDistortionLocation, distortionStrength);

      // ----------------------------------------------------
      // DRAW
      // ----------------------------------------------------

      drawQuad(displayProgram, displayPositionLocation, displayUvLocation);

      animationFrame = requestAnimationFrame(render);
    };

    // ========================================================
    // CLEANUP
    // ========================================================

    return () => {
      destroyed = true;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener('resize', resize);

      canvas.removeEventListener('mousemove', handleMouseMove);

      canvas.removeEventListener('mouseleave', handleMouseLeave);

      gl.deleteTexture(imageTexture);

      gl.deleteTexture(currentTexture);

      gl.deleteTexture(nextTexture);

      gl.deleteFramebuffer(currentFramebuffer);

      gl.deleteFramebuffer(nextFramebuffer);

      gl.deleteBuffer(positionBuffer);

      gl.deleteBuffer(uvBuffer);

      gl.deleteProgram(simulationProgram);

      gl.deleteProgram(displayProgram);
    };
  }, [image, rippleStrength, distortionStrength]);

  return (
    <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />
  );
};

export default WaterRipple;
