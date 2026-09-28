export const theme = {
  colors: {
    /* =====================================================
       BACKGROUNDS
       ===================================================== */

    background: "#F9F6F0",
    background2: "#FFF9F2",

    white: "#FFFFFF",
    black: "#10131A",


    /* =====================================================
       TEXT
       ===================================================== */

    ink: "#17243A",

    muted: "#596D82",

    navy: "#17243A",

    line: "#D8D0C6",


    /* =====================================================
       ACCENTS
       ===================================================== */

    coral: "#E96F6A",
    coralDark: "#B94C4A",

    pink: "#F4A0AF",

    teal: "#35A6A1",
    tealDark: "#267C79",

    sky: "#65A7E8",
    blue: "#5268D8",

    violet: "#9C72D4",
    lavender: "#C7B6EE",

    amber: "#EAB84C",

    green: "#6FA36B",

    red: "#CC514F",


    /* =====================================================
       SCIENCE
       ===================================================== */

    lung: "#F28E9C",

    vessel: "#D85B61",

    oxygen: "#65A7E8",

    fluid: "#7FB7DD",
  },


  /* =======================================================
     FONT FAMILIES
     ======================================================= */

  fonts: {
    display:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    body:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },


  /* =======================================================
     TYPOGRAPHY
     ======================================================= */

  typography: {
    /* Main scene title */

    title: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 76,

      lineHeight: 0.93,

      fontWeight: 900,

      letterSpacing: -4.4,

      color: "#17243A",
    },


    /* Slightly smaller title */

    titleMedium: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 68,

      lineHeight: 0.95,

      fontWeight: 900,

      letterSpacing: -3.7,

      color: "#17243A",
    },


    /* Main explanatory paragraph */

    bodyLarge: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 28,

      lineHeight: 1.36,

      fontWeight: 650,

      letterSpacing: -0.55,

      color: "#596D82",
    },


    /* Standard body */

    body: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 20,

      lineHeight: 1.36,

      fontWeight: 600,

      letterSpacing: -0.25,

      color: "#596D82",
    },


    /* Small bold explanatory text */

    label: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 22,

      lineHeight: 1.18,

      fontWeight: 800,

      letterSpacing: -0.45,

      color: "#17243A",
    },


    /* Uppercase pill / eyebrow */

    eyebrow: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      fontSize: 18,

      lineHeight: 1,

      fontWeight: 900,

      letterSpacing: 2.2,

      textTransform:
        "uppercase" as const,
    },
  },
} as const;