// ============================================================
// VERTEX SHADER
// ============================================================

export const vertexShader = `#version 300 es

in vec2 a_position;
in vec2 a_uv;

out vec2 v_uv;

void main() {
    v_uv = a_uv;

    gl_Position = vec4(
        a_position,
        0.0,
        1.0
    );
}
`;

// ============================================================
// WATER SIMULATION FRAGMENT SHADER
// ============================================================

export const simulationFragmentShader = `#version 300 es

precision highp float;

uniform sampler2D u_previous;
uniform vec2 u_resolution;

uniform vec2 u_mouse;
uniform float u_mouseActive;
uniform float u_mouseStrength;

out vec4 outColor;

void main() {

    ivec2 coord = ivec2(gl_FragCoord.xy);

    ivec2 resolution = ivec2(
        u_resolution
    );


    // --------------------------------------------------------
    // CURRENT STATE
    // --------------------------------------------------------

    vec4 current = texelFetch(
        u_previous,
        coord,
        0
    );

    float pressure = current.r;
    float velocity = current.g;


    // --------------------------------------------------------
    // NEIGHBOUR COORDINATES
    // --------------------------------------------------------

    ivec2 rightCoord =
        coord + ivec2(1, 0);

    ivec2 leftCoord =
        coord + ivec2(-1, 0);

    ivec2 upCoord =
        coord + ivec2(0, 1);

    ivec2 downCoord =
        coord + ivec2(0, -1);


    // --------------------------------------------------------
    // BOUNDARY CLAMPING
    // --------------------------------------------------------

    rightCoord.x =
        min(
            rightCoord.x,
            resolution.x - 1
        );

    leftCoord.x =
        max(
            leftCoord.x,
            0
        );

    upCoord.y =
        min(
            upCoord.y,
            resolution.y - 1
        );

    downCoord.y =
        max(
            downCoord.y,
            0
        );


    // --------------------------------------------------------
    // NEIGHBOUR PRESSURES
    // --------------------------------------------------------

    float pRight =
        texelFetch(
            u_previous,
            rightCoord,
            0
        ).r;

    float pLeft =
        texelFetch(
            u_previous,
            leftCoord,
            0
        ).r;

    float pUp =
        texelFetch(
            u_previous,
            upCoord,
            0
        ).r;

    float pDown =
        texelFetch(
            u_previous,
            downCoord,
            0
        ).r;


    // --------------------------------------------------------
    // LAPLACIAN
    //
    // Determines how pressure moves between neighbouring
    // pixels.
    // --------------------------------------------------------

    float laplacian =
        pRight +
        pLeft +
        pUp +
        pDown -
        4.0 * pressure;


    // --------------------------------------------------------
    // WAVE VELOCITY
    // --------------------------------------------------------

    velocity +=
        laplacian * 0.28;


    // Spring force

    velocity -=
        pressure * 0.006;


    // Velocity damping

    velocity *=
        0.985;


    // --------------------------------------------------------
    // UPDATE PRESSURE
    // --------------------------------------------------------

    pressure +=
        velocity;


    // Pressure damping

    pressure *=
        0.997;


    // --------------------------------------------------------
    // MOUSE RIPPLE
    // --------------------------------------------------------

    vec2 pixelPosition =
        gl_FragCoord.xy;


    float distanceToMouse =
        distance(
            pixelPosition,
            u_mouse
        );


    float rippleRadius =
        24.0;


    if (
        u_mouseActive > 0.5 &&
        distanceToMouse < rippleRadius
    ) {

        float influence =
            1.0 -
            distanceToMouse /
            rippleRadius;


        influence =
            smoothstep(
                0.0,
                1.0,
                influence
            );


        pressure +=
            influence *
            u_mouseStrength;
    }


    // --------------------------------------------------------
    // GRADIENT
    //
    // These values are later used to distort the image.
    // --------------------------------------------------------

    float gradientX =
        (pRight - pLeft) *
        0.5;


    float gradientY =
        (pUp - pDown) *
        0.5;


    // --------------------------------------------------------
    // OUTPUT
    //
    // R = pressure
    // G = velocity
    // B = gradient X
    // A = gradient Y
    // --------------------------------------------------------

    outColor = vec4(
        pressure,
        velocity,
        gradientX,
        gradientY
    );
}
`;

// ============================================================
// DISPLAY FRAGMENT SHADER
// ============================================================

export const displayFragmentShader = `#version 300 es

precision highp float;

uniform sampler2D u_image;
uniform sampler2D u_pressure;

uniform vec2 u_pressureResolution;

uniform float u_distortionStrength;

in vec2 v_uv;

out vec4 outColor;

void main() {

    // --------------------------------------------------------
    // PRESSURE TEXEL SIZE
    // --------------------------------------------------------

    vec2 texelSize =
        1.0 /
        u_pressureResolution;


    // --------------------------------------------------------
    // READ PRESSURE NEIGHBOURS
    // --------------------------------------------------------

    float pressureRight =
        texture(
            u_pressure,
            v_uv +
            vec2(
                texelSize.x,
                0.0
            )
        ).r;


    float pressureLeft =
        texture(
            u_pressure,
            v_uv -
            vec2(
                texelSize.x,
                0.0
            )
        ).r;


    float pressureUp =
        texture(
            u_pressure,
            v_uv +
            vec2(
                0.0,
                texelSize.y
            )
        ).r;


    float pressureDown =
        texture(
            u_pressure,
            v_uv -
            vec2(
                0.0,
                texelSize.y
            )
        ).r;


    // --------------------------------------------------------
    // CALCULATE DISTORTION
    // --------------------------------------------------------

    vec2 gradient = vec2(
        pressureRight -
        pressureLeft,

        pressureUp -
        pressureDown
    );


    gradient *= 0.5;


    // --------------------------------------------------------
    // LIMIT DISTORTION
    // --------------------------------------------------------

    vec2 displacement =
        gradient *
        u_distortionStrength;


    displacement =
        clamp(
            displacement,
            vec2(-0.035),
            vec2(0.035)
        );


    // --------------------------------------------------------
    // DISTORT IMAGE UV
    // --------------------------------------------------------

    vec2 distortedUV =
        v_uv -
        displacement;


    distortedUV =
        clamp(
            distortedUV,
            vec2(0.001),
            vec2(0.999)
        );


    // --------------------------------------------------------
    // SAMPLE IMAGE
    // --------------------------------------------------------

    vec4 color =
        texture(
            u_image,
            distortedUV
        );


    // --------------------------------------------------------
    // OUTPUT
    // --------------------------------------------------------

    outColor = color;
}
`;
