export type AssetMode =
  | "photo"
  | "cutout"
  | "paper"
  | "full";


export type StaticAsset = {
  src:
    string;

  credit:
    string;

  mode:
    AssetMode;
};


const supplied =
  "User-provided image — add original source URL to final credits";


export const ASSETS = {
  /* =======================================================
     OUTBREAK
     ======================================================= */

  outbreak: {
    harbor: {
      src:
        "assets/outbreak/ushuaia-harbor.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },

    shipResponse: {
      src:
        "assets/outbreak/ship-response.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },

    evacuation: {
      src:
        "assets/outbreak/evacuation.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },

    routeMap: {
      src:
        "assets/outbreak/route-map.jpg",

      credit:
        supplied,

      mode:
        "paper",
    },

    routeTimeline: {
      src:
        "assets/outbreak/route-timeline.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    routeInfographic: {
      src:
        "assets/outbreak/route-infographic.webp",

      credit:
        supplied,

      mode:
        "photo",
    },

    labIllustration: {
      src:
        "assets/outbreak/lab-illustration.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    pcrPhoto: {
      src:
        "assets/outbreak/pcr-photo.webp",

      credit:
        supplied,

      mode:
        "photo",
    },

    globalCasesMap: {
      src:
        "assets/outbreak/global-cases-map.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    shipCutout: {
      src:
        "assets/outbreak/ship-cutout.png",

      credit:
        supplied,

      mode:
        "cutout",
    },
  },


  /* =======================================================
     CHARACTERS
     ======================================================= */

  characters: {
    passengerA: {
      src:
        "assets/characters/passenger-a.png",

      credit:
        supplied,

      mode:
        "cutout",
    },

    passengerB: {
      src:
        "assets/characters/passenger-b.png",

      credit:
        supplied,

      mode:
        "cutout",
    },

    /**
     * File is named passenger-c.webp,
     * but passengerWave remains the public key so
     * existing scenes do not need to change.
     */
    passengerWave: {
      src:
        "assets/characters/passenger-c.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    ppeWorker: {
      src:
        "assets/characters/ppe-worker-cutout.png",

      credit:
        supplied,

      mode:
        "cutout",
    },
  },


  /* =======================================================
     VIRUS
     ======================================================= */

  virus: {
    cepi: {
      src:
        "assets/virus/cepi-virus.webp",

      credit:
        "Image credit in supplied file: ViralZone / SwissBioPics",

      mode:
        "cutout",
    },

    crossSection: {
      src:
        "assets/virus/cross-section.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    explainer: {
      src:
        "assets/virus/explainer.webp",

      credit:
        supplied,

      mode:
        "photo",
    },
  },


  /* =======================================================
     TRANSMISSION
     ======================================================= */

  transmission: {
    ratCutout: {
      src:
        "assets/transmission/rat-cutout.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    ratInfo: {
      src:
        "assets/transmission/rat-info.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    rodentInfested: {
      src:
        "assets/transmission/rodent-infested.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },


    /* -----------------------------------------------------
       ENVIRONMENT
       ----------------------------------------------------- */

    house: {
      src:
        "assets/transmission/house.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    container: {
      src:
        "assets/transmission/container.png",

      credit:
        supplied,

      mode:
        "paper",
    },


    /* -----------------------------------------------------
       SAFE CLEANING
       ----------------------------------------------------- */

    disinfectantSpray: {
      src:
        "assets/transmission/disinfectant-spray-icon-cartoon-style-vector.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    /**
     * Rename the very long broom filename in public/assets/transmission
     * to broom.png so it is much easier to reference safely.
     */
    broom: {
      src:
        "assets/transmission/broom.png",

      credit:
        supplied,

      mode:
        "paper",
    },


    /**
     * Existing alias kept for scenes that still reference
     * cartoonRatCutout.
     */
    cartoonRatCutout: {
      src:
        "assets/transmission/rat-info.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },
  },


  /* =======================================================
     PATHOGENESIS
     ======================================================= */

  pathogenesis: {
    lungsAlveoli: {
      src:
        "assets/pathogenesis/lungs-alveoli.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    alveolusGasExchange: {
      src:
        "assets/pathogenesis/alveolus-gas-exchange.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    pulmonaryEdema: {
      src:
        "assets/pathogenesis/pulmonary-edema.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    chestXray: {
      src:
        "assets/pathogenesis/chest-xray.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },

    /**
     * FIXED:
     * Your actual file shown in VS Code is lungs-organ.webp.
     */
    lungsOrgan: {
      src:
        "assets/pathogenesis/lungs-organ.png",

      credit:
        supplied,

      mode:
        "paper",
    },
  },


  /* =======================================================
     SYMPTOMS
     ======================================================= */

  symptoms: {
    infographic: {
      src:
        "assets/symptoms/symptoms-infographic.jpg",

      credit:
        supplied,

      mode:
        "paper",
    },

    treatmentPhoto: {
      src:
        "assets/symptoms/treatment-photo.jpg",

      credit:
        supplied,

      mode:
        "photo",
    },


    /* -----------------------------------------------------
       INDIVIDUAL SYMPTOM ILLUSTRATIONS
       ----------------------------------------------------- */

    coughingBoy: {
      src:
        "assets/symptoms/coughing_boy_with_dry_cough_label.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    rapidHeartbeat: {
      src:
        "assets/symptoms/elderly_man_with_rapid_heartbeat_icon.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    fatigue: {
      src:
        "assets/symptoms/fatigue_slumped_in_a_blue_chair.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    feverCare: {
      src:
        "assets/symptoms/fever_care_illustration.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    stomachProblems: {
      src:
        "assets/symptoms/man_with_stomach_problems.png",

      credit:
        supplied,

      mode:
        "paper",
    },

    troubleBreathing: {
      src:
        "assets/symptoms/trouble_breathing_illustration.png",

      credit:
        supplied,

      mode:
        "paper",
    },
  },


  /* =======================================================
     CANADA
     ======================================================= */

  canada: {
    bcMap: {
      src:
        "assets/canada/bc-map-cutout.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    nmlBuilding: {
      src:
        "assets/canada/nml-building.webp",

      credit:
        supplied,

      mode:
        "photo",
    },

    southAmericaMap: {
      src:
        "assets/canada/south-america-map-cutout.png",

      credit:
        supplied,

      mode:
        "cutout",
    },
  },


  /* =======================================================
     PREVENTION
     ======================================================= */

  prevention: {
    rodentEntry: {
      src:
        "assets/prevention/rodent-entry.webp",

      credit:
        supplied,

      mode:
        "cutout",
    },

    ppeCutout: {
      src:
        "assets/prevention/ppe-cutout.webp",

      credit:
        supplied,

      mode:
        "paper",
    },

    ppeSet: {
      src:
        "assets/prevention/ppe-set.jpg",

      credit:
        supplied,

      mode:
        "paper",
    },

    ppeWorker: {
      src:
        "assets/prevention/ppe-worker.jpg",

      credit:
        supplied,

      mode:
        "paper",
    },
  },
} as const;