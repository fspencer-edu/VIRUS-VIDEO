import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  ASSETS,
} from "../../../data/assets";


const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';


const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   PHOTO SIZE
   ========================================================= */

const PHOTO_WIDTH =
  1178;

const PHOTO_HEIGHT =
  750.5;


/* =========================================================
   SOURCE SAFE AREA
   ========================================================= */

const SourceSafeArea = () => (
  <div
    style={{
      position:
        "absolute",

      left:
        0,

      right:
        0,

      bottom:
        0,

      height:
        58,

      background: `
        linear-gradient(
          180deg,
          rgba(
            248,
            245,
            239,
            0
          )
          0%,
          rgba(
            248,
            245,
            239,
            .98
          )
          68%
        )
      `,

      pointerEvents:
        "none",

      zIndex:
        50,
    }}
  />
);


/* =========================================================
   LOCATION ICON
   ========================================================= */

const LocationMarker = ({
  progress,
}: {
  progress:
    number;
}) => {
  const iconScale =
    interpolate(
      progress,
      [
        0,
        1,
      ],
      [
        0.72,
        1,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  return (
    <div
      style={{
        width:
          66,

        height:
          66,

        flex:
          "0 0 auto",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        borderRadius:
          "50%",

        background:
          "#F26A60",

        boxShadow:
          "0 14px 32px rgba(242,106,96,.28)",

        transform: `
          scale(
            ${iconScale}
          )
        `,
      }}
    >
      <svg
        width="31"
        height="31"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="
            M12 21
            C12 21 19 15.2 19 9.5
            C19 5.36 15.87 2 12 2
            C8.13 2 5 5.36 5 9.5
            C5 15.2 12 21 12 21
          "
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="12"
          cy="9.5"
          r="2.4"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const PortContextShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     EYEBROW ANIMATION
     ======================================================= */

  const eyebrowIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          200,

        stiffness:
          86,

        mass:
          0.8,
      },
    });


  /* =======================================================
     MAIN TITLE ANIMATION
     ======================================================= */

  const titleIn =
    spring({
      frame:
        frame -
        4,

      fps,

      config: {
        damping:
          175,

        stiffness:
          90,

        mass:
          0.95,
      },
    });


  /* =======================================================
     SECOND TITLE LINE
     ======================================================= */

  const secondTitleIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,

        mass:
          0.95,
      },
    });


  /* =======================================================
     ACCENT LINE
     ======================================================= */

  const accentIn =
    spring({
      frame:
        frame -
        12,

      fps,

      config: {
        damping:
          180,

        stiffness:
          96,
      },
    });


  /* =======================================================
     DESCRIPTION
     ======================================================= */

  const bodyIn =
    spring({
      frame:
        frame -
        14,

      fps,

      config: {
        damping:
          190,

        stiffness:
          82,
      },
    });


  /* =======================================================
     VESSEL INFORMATION
     ======================================================= */

  const vesselIn =
    spring({
      frame:
        frame -
        20,

      fps,

      config: {
        damping:
          180,

        stiffness:
          88,
      },
    });


  /* =======================================================
     PHOTO
     ======================================================= */

  const imageIn =
    spring({
      frame:
        frame -
        5,

      fps,

      config: {
        damping:
          165,

        stiffness:
          72,

        mass:
          1.05,
      },
    });


  /* =======================================================
     PHOTO LABELS
     ======================================================= */

  const topLabelIn =
    spring({
      frame:
        frame -
        18,

      fps,

      config: {
        damping:
          185,

        stiffness:
          98,
      },
    });


  const bottomLabelIn =
    spring({
      frame:
        frame -
        23,

      fps,

      config: {
        damping:
          190,

        stiffness:
          88,
      },
    });


  /* =======================================================
     PHOTO ENTRY MOTION
     ======================================================= */

  const photoScale =
    interpolate(
      imageIn,
      [
        0,
        1,
      ],
      [
        0.965,
        1,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const photoX =
    interpolate(
      imageIn,
      [
        0,
        1,
      ],
      [
        52,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const photoY =
    interpolate(
      imageIn,
      [
        0,
        1,
      ],
      [
        22,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     SUBTLE IMAGE DRIFT
     ======================================================= */

  const imageDriftY =
    interpolate(
      frame,
      [
        0,
        120,
      ],
      [
        0,
        -7,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const imageDriftScale =
    interpolate(
      frame,
      [
        0,
        120,
      ],
      [
        1,
        1.008,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     TITLE TRANSFORMS
     ======================================================= */

  const titleY =
    interpolate(
      titleIn,
      [
        0,
        1,
      ],
      [
        34,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const secondTitleY =
    interpolate(
      secondTitleIn,
      [
        0,
        1,
      ],
      [
        30,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const bodyY =
    interpolate(
      bodyIn,
      [
        0,
        1,
      ],
      [
        24,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const vesselY =
    interpolate(
      vesselIn,
      [
        0,
        1,
      ],
      [
        22,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     BACKGROUND ACCENT ANIMATION
     ======================================================= */

  const backgroundAccentScale =
    interpolate(
      imageIn,
      [
        0,
        1,
      ],
      [
        0.9,
        1,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  return (
    <div
      style={{
        position:
          "absolute",

        inset:
          0,

        overflow:
          "hidden",

        background: `
          linear-gradient(
            135deg,
            #F9F6F0
            0%,
            #F7F4EE
            54%,
            #F4F1EB
            100%
          )
        `,
      }}
    >

      {/* ================================================= */}
      {/* PAPER TEXTURE                                     */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            0.17,

          backgroundImage: `
            radial-gradient(
              circle,
              rgba(
                33,
                54,
                72,
                .14
              )
              0.7px,
              transparent
              0.75px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* BACKGROUND ACCENT                                 */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            470,

          top:
            -195,

          width:
            760,

          height:
            760,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(
                24,
                139,
                152,
                .075
              )
              0%,
              rgba(
                24,
                139,
                152,
                .028
              )
              48%,
              rgba(
                24,
                139,
                152,
                0
              )
              72%
            )
          `,

          transform: `
            scale(
              ${backgroundAccentScale}
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* LEFT CONTENT                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            76,

          top:
            92,

          width:
            620,

          zIndex:
            20,
        }}
      >

        {/* ================================================= */}
        {/* EYEBROW                                           */}
        {/* ================================================= */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              17,

            opacity:
              eyebrowIn,

            transform: `
              translateX(
                ${(1 - eyebrowIn) * -18}px
              )
            `,
          }}
        >
          <span
            style={{
              width:
                48 * eyebrowIn,

              height:
                5,

              borderRadius:
                999,

              background:
                "#0E8D97",

              transformOrigin:
                "left center",
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                27,

              lineHeight:
                1,

              fontWeight:
                850,

              letterSpacing:
                3.2,

              textTransform:
                "uppercase",

              color:
                "#0E8D97",
            }}
          >
            Departure point
          </div>
        </div>


        {/* ================================================= */}
        {/* TITLE — USHUAIA                                   */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            fontFamily:
              TITLE_STACK,

            fontSize:
              138,

            lineHeight:
              0.82,

            fontWeight:
              840,

            letterSpacing:
              -7.8,

            color:
              "#17243A",

            opacity:
              titleIn,

            transform: `
              translateY(
                ${titleY}px
              )

              scale(
                ${0.98 + titleIn * 0.02}
              )
            `,

            transformOrigin:
              "left bottom",
          }}
        >
          Ushuaia,
        </div>


        {/* ================================================= */}
        {/* TITLE — ARGENTINA                                 */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              12,

            fontFamily:
              TITLE_STACK,

            fontSize:
              108,

            lineHeight:
              0.88,

            fontWeight:
              800,

            letterSpacing:
              -5.7,

            color:
              "#435C76",

            opacity:
              secondTitleIn,

            transform: `
              translateY(
                ${secondTitleY}px
              )
            `,
          }}
        >
          Argentina
        </div>


        {/* ================================================= */}
        {/* CORAL ACCENT                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              36,

            width:
              104 * accentIn,

            height:
              7,

            borderRadius:
              999,

            background:
              "#F26A60",

            transformOrigin:
              "left center",
          }}
        />


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              36,

            width:
              600,

            fontFamily:
              FONT_STACK,

            fontSize:
              43,

            lineHeight:
              1.27,

            fontWeight:
              575,

            letterSpacing:
              -0.9,

            color:
              "#566A80",

            opacity:
              bodyIn,

            transform: `
              translateY(
                ${bodyY}px
              )
            `,
          }}
        >
          The voyage departs from the southern port city
          of Ushuaia before heading into remote South
          Atlantic waters.
        </div>


        {/* ================================================= */}
        {/* VESSEL INFORMATION                                */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              56,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              21,

            opacity:
              vesselIn,

            transform: `
              translateY(
                ${vesselY}px
              )
            `,
          }}
        >
          <LocationMarker
            progress={
              vesselIn
            }
          />

          <div>
            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  22,

                lineHeight:
                  1,

                fontWeight:
                  850,

                letterSpacing:
                  2.5,

                textTransform:
                  "uppercase",

                color:
                  "#84909F",
              }}
            >
              Expedition vessel
            </div>


            <div
              style={{
                marginTop:
                  11,

                fontFamily:
                  FONT_STACK,

                fontSize:
                  41,

                lineHeight:
                  1,

                fontWeight:
                  795,

                letterSpacing:
                  -0.8,

                color:
                  "#293E56",
              }}
            >
              M/V Hondius
            </div>
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* PHOTO                                             */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          width:
            PHOTO_WIDTH,

          height:
            PHOTO_HEIGHT,

          right:
            40,

          top:
            108,

          overflow:
            "hidden",

          borderRadius:
            30,

          background:
            "#DDE5E8",

          opacity:
            imageIn,

          transform: `
            translate(
              ${photoX}px,
              ${photoY}px
            )

            scale(
              ${photoScale}
            )
          `,

          transformOrigin:
            "center",

          boxShadow: `
            0
            26px
            62px
            rgba(
              27,
              40,
              52,
              ${0.075 * imageIn}
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* IMAGE                                             */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            transform: `
              translateY(
                ${imageDriftY}px
              )

              scale(
                ${imageDriftScale}
              )
            `,

            transformOrigin:
              "center",
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .outbreak
                .harbor
            }

            width={
              PHOTO_WIDTH
            }

            height={
              PHOTO_HEIGHT
            }

            zoom={
              1
            }

            panX={
              0
            }

            panY={
              0
            }

            objectPosition="50% 50%"

            organic={
              false
            }

            showCredit={
              false
            }
          />
        </div>


        {/* ================================================= */}
        {/* BOTTOM READABILITY GRADIENT                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              0,

            right:
              0,

            bottom:
              0,

            height:
              190,

            background: `
              linear-gradient(
                180deg,
                rgba(
                  8,
                  20,
                  30,
                  0
                )
                0%,

                rgba(
                  8,
                  20,
                  30,
                  .035
                )
                25%,

                rgba(
                  8,
                  20,
                  30,
                  .16
                )
                55%,

                rgba(
                  8,
                  20,
                  30,
                  .56
                )
                100%
              )
            `,

            pointerEvents:
              "none",

            zIndex:
              2,
          }}
        />


        {/* ================================================= */}
        {/* TOP LABEL                                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              32,

            top:
              30,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              12,

            padding:
              "14px 20px",

            borderRadius:
              999,

            background:
              "rgba(250,250,248,.95)",

            boxShadow:
              "0 8px 24px rgba(24,35,46,.10)",

            opacity:
              topLabelIn,

            transform: `
              translateY(
                ${(1 - topLabelIn) * -18}px
              )

              scale(
                ${0.94 + topLabelIn * 0.06}
              )
            `,

            transformOrigin:
              "left top",

            zIndex:
              5,
          }}
        >
          <span
            style={{
              width:
                11,

              height:
                11,

              borderRadius:
                "50%",

              background:
                "#0E8D97",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1,

              fontWeight:
                850,

              letterSpacing:
                2.1,

              textTransform:
                "uppercase",

              color:
                "#2B5460",
            }}
          >
            Port of Ushuaia
          </span>
        </div>


        {/* ================================================= */}
        {/* BOTTOM IMAGE INFORMATION                          */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              38,

            right:
              34,

            bottom:
              30,

            display:
              "flex",

            alignItems:
              "flex-end",

            justifyContent:
              "space-between",

            gap:
              36,

            opacity:
              bottomLabelIn,

            transform: `
              translateY(
                ${(1 - bottomLabelIn) * 22}px
              )
            `,

            zIndex:
              5,
          }}
        >

          {/* ================================================= */}
          {/* LOCATION + DESCRIPTION                            */}
          {/* ================================================= */}

          <div>
            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  19,

                lineHeight:
                  1,

                fontWeight:
                  850,

                letterSpacing:
                  2.1,

                textTransform:
                  "uppercase",

                color:
                  "rgba(255,255,255,.92)",

                textShadow:
                  "0 2px 10px rgba(0,0,0,.34)",
              }}
            >
              Southern Argentina
            </div>


            <div
              style={{
                marginTop:
                  8,

                fontFamily:
                  FONT_STACK,

                fontSize:
                  43,

                lineHeight:
                  1,

                fontWeight:
                  805,

                letterSpacing:
                  -1.2,

                color:
                  "#FFFFFF",

                textShadow:
                  "0 3px 14px rgba(0,0,0,.40)",
              }}
            >
              Gateway to the South Atlantic
            </div>
          </div>


          {/* ================================================= */}
          {/* DATE                                              */}
          {/* ================================================= */}

          <div
            style={{
              flex:
                "0 0 auto",

              padding:
                "12px 19px",

              borderRadius:
                999,

              background:
                "rgba(13,34,47,.58)",

              border:
                "1px solid rgba(255,255,255,.22)",

              fontFamily:
                FONT_STACK,

              fontSize:
                19,

              lineHeight:
                1,

              fontWeight:
                820,

              letterSpacing:
                1.7,

              color:
                "#FFFFFF",

              transform: `
                scale(
                  ${0.94 + bottomLabelIn * 0.06}
                )
              `,
            }}
          >
            APRIL 2026
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* SOURCE SAFE AREA                                  */}
      {/* ================================================= */}

      <SourceSafeArea />
    </div>
  );
};