import {
  theme,
} from "../../theme/theme";


type Props = {
  sources:
    string[];
};


export const SourceStrip = ({
  sources,
}: Props) => {
  return (
    <div
      style={{
        position:
          "absolute",

        left:
          44,

        right:
          44,

        bottom:
          24,

        display:
          "flex",

        alignItems:
          "center",

        flexWrap:
          "wrap",

        gap:
          10,

        fontFamily:
          theme.fonts.body,

        fontSize:
          16,

        lineHeight:
          1.25,

        fontWeight:
          600,

        color:
          theme.colors.muted,

        zIndex:
          100,
      }}
    >

      {/* =============================================== */}
      {/* SOURCE LABEL                                    */}
      {/* =============================================== */}

      <span
        style={{
          fontWeight:
            850,

          color:
            theme.colors.ink,
        }}
      >
        Sources:
      </span>


      {/* =============================================== */}
      {/* SOURCES                                         */}
      {/* =============================================== */}

      {sources.map(
        (
          source,
          index
        ) => (
          <div
            key={
              `${source}-${index}`
            }

            style={{
              display:
                "contents",
            }}
          >
            {index >
            0 ? (
              <span
                style={{
                  color:
                    "rgba(89,109,130,.42)",
                }}
              >
                •
              </span>
            ) : null}

            <span>
              {source}
            </span>
          </div>
        )
      )}
    </div>
  );
};