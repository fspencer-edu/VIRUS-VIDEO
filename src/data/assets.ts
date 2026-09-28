export type AssetMode =
  | "photo"
  | "cutout"
  | "paper"
  | "full";

export type StaticAsset = {
  src: string;
  credit: string;
  mode: AssetMode;
};

const supplied =
  "User-provided image — add original source URL to final credits";

export const ASSETS = {
  outbreak: {
    harbor: {
      src: "assets/outbreak/ushuaia-harbor.jpg",
      credit: supplied,
      mode: "photo",
    },
    shipResponse: {
      src: "assets/outbreak/ship-response.jpg",
      credit: supplied,
      mode: "photo",
    },
    evacuation: {
      src: "assets/outbreak/evacuation.jpg",
      credit: supplied,
      mode: "photo",
    },
    routeMap: {
      src: "assets/outbreak/route-map.jpg",
      credit: supplied,
      mode: "paper",
    },
    routeTimeline: {
      src: "assets/outbreak/route-timeline.webp",
      credit: supplied,
      mode: "paper",
    },
    routeInfographic: {
      src: "assets/outbreak/route-infographic.webp",
      credit: supplied,
      mode: "photo",
    },
    labIllustration: {
      src: "assets/outbreak/lab-illustration.webp",
      credit: supplied,
      mode: "paper",
    },
    pcrPhoto: {
      src: "assets/outbreak/pcr-photo.webp",
      credit: supplied,
      mode: "photo",
    },
    globalCasesMap: {
      src: "assets/outbreak/global-cases-map.webp",
      credit: supplied,
      mode: "paper",
    },
  },

  characters: {
    passengerA: {
      src: "assets/characters/passenger-a.webp",
      credit: supplied,
      mode: "cutout",
    },
    passengerB: {
      src: "assets/characters/passenger-b.webp",
      credit: supplied,
      mode: "cutout",
    },
    passengerWave: {
      src: "assets/characters/passenger-wave.webp",
      credit: supplied,
      mode: "cutout",
    },
    ppeWorker: {
      src: "assets/characters/ppe-worker-cutout.webp",
      credit: supplied,
      mode: "cutout",
    },
  },

  virus: {
    cepi: {
      src: "assets/virus/cepi-virus.webp",
      credit:
        "Image credit in supplied file: ViralZone / SwissBioPics",
      mode: "cutout",
    },
    crossSection: {
      src: "assets/virus/cross-section.webp",
      credit: supplied,
      mode: "cutout",
    },
    explainer: {
      src: "assets/virus/explainer.webp",
      credit: supplied,
      mode: "photo",
    },
  },

  transmission: {
    ratCutout: {
      src: "assets/transmission/rat-cutout.webp",
      credit: supplied,
      mode: "cutout",
    },
    ratInfo: {
      src: "assets/transmission/rat-info.webp",
      credit: supplied,
      mode: "cutout",
    },
    rodentInfested: {
      src: "assets/transmission/rodent-infested.jpg",
      credit: supplied,
      mode: "photo",
    },
    cartoonRatCutout: {
      src: "assets/transmission/cartoon-rat-cutout.webp",
      credit: supplied,
      mode: "cutout",
    },
  },

  pathogenesis: {
    lungsAlveoli: {
      src: "assets/pathogenesis/lungs-alveoli.webp",
      credit: supplied,
      mode: "paper",
    },
    alveolusGasExchange: {
      src: "assets/pathogenesis/alveolus-gas-exchange.webp",
      credit: supplied,
      mode: "paper",
    },
    pulmonaryEdema: {
      src: "assets/pathogenesis/pulmonary-edema.webp",
      credit: supplied,
      mode: "paper",
    },
    chestXray: {
      src: "assets/pathogenesis/chest-xray.jpg",
      credit: supplied,
      mode: "photo",
    },
    lungsOrgan: {
      src: "assets/pathogenesis/lungs-organ.webp",
      credit: supplied,
      mode: "paper",
    },
  },

  canada: {
    bcMap: {
      src: "assets/canada/bc-map-cutout.webp",
      credit: supplied,
      mode: "cutout",
    },
    nmlBuilding: {
      src: "assets/canada/nml-building.webp",
      credit: supplied,
      mode: "photo",
    },
    southAmericaMap: {
      src: "assets/canada/south-america-map-cutout.webp",
      credit: supplied,
      mode: "cutout",
    },
  },

  prevention: {
    rodentEntry: {
      src: "assets/prevention/rodent-entry.webp",
      credit: supplied,
      mode: "cutout",
    },
    ppeCutout: {
      src: "assets/prevention/ppe-cutout.webp",
      credit: supplied,
      mode: "paper",
    },
    ppeSet: {
      src: "assets/prevention/ppe-set.jpg",
      credit: supplied,
      mode: "paper",
    },
    ppeWorker: {
      src: "assets/prevention/ppe-worker.jpg",
      credit: supplied,
      mode: "paper",
    },
  },

  symptoms: {
    infographic: {
      src: "assets/symptoms/symptoms-infographic.jpg",
      credit: supplied,
      mode: "paper",
    },
    treatmentPhoto: {
      src: "assets/symptoms/treatment-photo.jpg",
      credit: supplied,
      mode: "photo",
    },
  },
} as const;
