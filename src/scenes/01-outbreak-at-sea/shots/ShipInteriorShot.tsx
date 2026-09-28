import {
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  AnimatedRoute,
} from "../../../components/visuals/AnimatedRoute";

import type {
  StaticAsset,
} from "../../../data/assets";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";

const shipCutout: StaticAsset = {
  src: "assets/outbreak/ship-cutout.png",
  credit:
    "User-provided cruise-ship illustration — add original source to final credits",
  mode: "cutout",
};

const routePath =
  "M 235 790 C 390 712 585 660 760 583 C 945 500 1135 422 1390 300";

export const ShipInteriorShot = () => {
  const frame =
    useCurrentFrame();

  const mapReveal =
    interpolate(
      frame,
      [0, 26],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const shipZoom =
    interpolate(
      frame,
      [145, 210],
      [0.18, 0.42],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const zoomX =
    interpolate(
      frame,
      [145, 210],
      [0, -185],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const zoomY =
    interpolate(
      frame,
      [145, 210],
      [0, -72],
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
        inset: 0,
        overflow:
          "hidden",
        background:
          "#0D1727",
      }}
    >
      <CinematicCamera
        durationInFrames={210}
        from={{
          scale: 1.06,
          x: 20,
          y: 10,
        }}
        to={{
          scale:
            1.18 +
            shipZoom,
          x:
            -70 +
            zoomX,
          y:
            -25 +
            zoomY,
        }}
        origin="64% 55%"
      >
        <div
          style={{
            position:
              "absolute",
            left: 90,
            top: 45,
            filter:
              "grayscale(.15) brightness(.55) contrast(1.35) saturate(.7)",
            opacity:
              mapReveal,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .outbreak
                .routeMap
            }
            width={1740}
            height={960}
            zoom={1.02}
            showCredit={false}
            organic={false}
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(7,15,28,.18), rgba(7,15,28,.55))",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            left: 0,
            top: 0,
          }}
        >
          <AnimatedRoute
            d={routePath}
            viewBox="0 0 1920 1080"
            width={1920}
            height={1080}
            startFrame={18}
            endFrame={165}
            stroke="#FF8D84"
            strokeWidth={7}
            followerRadius={0}
            followerColor="transparent"
            followerOutline="transparent"
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            left:
              interpolate(
                frame,
                [18, 165],
                [75, 1220],
                {
                  extrapolateLeft:
                    "clamp",
                  extrapolateRight:
                    "clamp",
                }
              ),
            top:
              interpolate(
                frame,
                [18, 165],
                [670, 245],
                {
                  extrapolateLeft:
                    "clamp",
                  extrapolateRight:
                    "clamp",
                }
              ) +
              Math.sin(
                frame / 10
              ) *
                4,
            transform:
              "scale(.19)",
            transformOrigin:
              "center",
          }}
        >
          <EditorialAsset
            asset={
              shipCutout
            }
            width={760}
            height={430}
            zoom={1}
            showCredit={false}
          />
        </div>
      </CinematicCamera>

      <div
        style={{
          position:
            "absolute",
          left: 70,
          top: 65,
          color: "#F6F2EA",
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts.display,
            fontSize: 60,
            lineHeight: 1.02,
          }}
        >
          Into the
          South Atlantic
        </div>

        <div
          style={{
            marginTop: 17,
            width: 650,
            fontFamily:
              theme.fonts.body,
            fontSize: 26,
            lineHeight: 1.45,
            color:
              "rgba(246,242,234,.78)",
          }}
        >
          A route line traces
          the voyage from
          Ushuaia as the
          camera closes in on
          the ship.
        </div>
      </div>

      <div
        style={{
          position:
            "absolute",
          left: 155,
          bottom: 125,
          padding:
            "9px 15px",
          borderRadius: 20,
          background:
            "rgba(255,255,255,.1)",
          border:
            "1px solid rgba(255,255,255,.18)",
          color: "#FFFFFF",
          fontFamily:
            theme.fonts.body,
          fontSize: 22,
        }}
      >
        Ushuaia, Argentina
      </div>
    </div>
  );
};
