import {
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
  1210;

const PHOTO_HEIGHT =
  720;


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

const LocationMarker = () => (
  <div
    style={{
      width:
        62,

      height:
        62,

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
        "0 12px 28px rgba(242,106,96,.26)",
    }}
  >
    <svg
      width="30"
      height="30"
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
     ANIMATION
     ======================================================= */

  const copyIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          84,
      },
    });


  const imageIn =
    spring({
      frame:
        frame -
        5,

      fps,

      config: {
        damping:
          180,

        stiffness:
          76,
      },
    });


  const detailIn =
    spring({
      frame:
        frame -
        15,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,
      },
    });


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
            500,

          top:
            -240,

          width:
            700,

          height:
            700,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(
                24,
                139,
                152,
                .07
              )
              0%,
              rgba(
                24,
                139,
                152,
                .025
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
            84,

          top:
            70,

          width:
            620,

          opacity:
            copyIn,

          transform: `
            translateY(
              ${(1 - copyIn) * 18}px
            )
          `,

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
              16,
          }}
        >
          <span
            style={{
              width:
                44,

              height:
                5,

              borderRadius:
                999,

              background:
                "#0E8D97",
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                25,

              fontWeight:
                850,

              letterSpacing:
                3,

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
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              28,

            fontFamily:
              TITLE_STACK,

            fontSize:
              124,

            lineHeight:
              0.84,

            fontWeight:
              830,

            letterSpacing:
              -7,

            color:
              "#17243A",
          }}
        >
          Ushuaia,
        </div>


        <div
          style={{
            marginTop:
              8,

            fontFamily:
              TITLE_STACK,

            fontSize:
              98,

            lineHeight:
              0.9,

            fontWeight:
              790,

            letterSpacing:
              -5.2,

            color:
              "#435C76",
          }}
        >
          Argentina
        </div>


        {/* ================================================= */}
        {/* ACCENT                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            width:
              96,

            height:
              7,

            borderRadius:
              999,

            background:
              "#F26A60",
          }}
        />


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            width:
              600,

            fontFamily:
              FONT_STACK,

            fontSize:
              40,

            lineHeight:
              1.29,

            fontWeight:
              570,

            letterSpacing:
              -0.8,

            color:
              "#566A80",
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
              46,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              20,

            opacity:
              detailIn,

            transform: `
              translateY(
                ${(1 - detailIn) * 12}px
              )
            `,
          }}
        >
          <LocationMarker />

          <div>
            <div
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
                  2.3,

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
                  10,

                fontFamily:
                  FONT_STACK,

                fontSize:
                  37,

                lineHeight:
                  1,

                fontWeight:
                  790,

                letterSpacing:
                  -0.6,

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
            30,

          top:
            76,

          overflow:
            "hidden",

          borderRadius:
            30,

          background:
            "#DDE5E8",

          opacity:
            imageIn,

          transform: `
            translateX(
              ${(1 - imageIn) * 24}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* CLEAN IMAGE                                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,
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
        {/* VERY LIGHT BOTTOM READABILITY GRADIENT           */}
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
              150,

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
                  .06
                )
                34%,
                rgba(
                  8,
                  20,
                  30,
                  .52
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
              30,

            top:
              28,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              11,

            padding:
              "13px 18px",

            borderRadius:
              999,

            background:
              "rgba(250,250,248,.94)",

            boxShadow:
              "0 8px 24px rgba(24,35,46,.10)",

            zIndex:
              5,
          }}
        >
          <span
            style={{
              width:
                10,

              height:
                10,

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
                18,

              fontWeight:
                850,

              letterSpacing:
                2,

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
        {/* BOTTOM IMAGE LABELS                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            right:
              32,

            bottom:
              26,

            display:
              "flex",

            alignItems:
              "flex-end",

            justifyContent:
              "space-between",

            gap:
              32,

            opacity:
              detailIn,

            zIndex:
              5,
          }}
        >
          <div>
            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  17,

                lineHeight:
                  1,

                fontWeight:
                  850,

                letterSpacing:
                  2,

                textTransform:
                  "uppercase",

                color:
                  "rgba(255,255,255,.88)",

                textShadow:
                  "0 2px 10px rgba(0,0,0,.32)",
              }}
            >
              Southern Argentina
            </div>


            <div
              style={{
                marginTop:
                  7,

                fontFamily:
                  FONT_STACK,

                fontSize:
                  38,

                lineHeight:
                  1.02,

                fontWeight:
                  800,

                letterSpacing:
                  -1,

                color:
                  "#FFFFFF",

                textShadow:
                  "0 3px 14px rgba(0,0,0,.38)",
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
                "11px 17px",

              borderRadius:
                999,

              background:
                "rgba(13,34,47,.55)",

              border:
                "1px solid rgba(255,255,255,.22)",

              fontFamily:
                FONT_STACK,

              fontSize:
                17,

              fontWeight:
                820,

              letterSpacing:
                1.6,

              color:
                "#FFFFFF",
            }}
          >
            APRIL 2026
          </div>
        </div>
      </div>


      <SourceSafeArea />
    </div>
  );
};