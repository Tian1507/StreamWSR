// ============ PATH CONFIG ============
// If your current HTML uses "../wavs/...", keep "../wavs".
// If index.html is in project root and wavs is also in root, use "./wavs".
const BASE_PATH = "./wavs";

// Methods (columns) - keep consistent across all sections
const METHODS = [
  { key: "Narrowband", label: "Narrowband" },
  { key: "Wideband",  label: "Wideband"  },
  { key: "UDM+",      label: "UDM+"      },
  { key: "TRAMBA",  label: "TRAMBA"  },
  { key: "FLowHigh",  label: "FLowHigh"  },
  { key: "AP-BWE",    label: "AP-BWE"    },
  { key: "StreamWSR", label: "StreamWSR" },
];

// Sections + sample keys (file stem without extension)
const SECTIONS = [
  {
    id: "8kto16k",
    title: "I. 8 kHz to 16 kHz",
    dir: "8kto16k",
    samples: ["p362_225", "p363_350", "p374_420", "s5_115", "s5_130"],
  },
  {
    id: "4kto16k",
    title: "II. 4 kHz to 16 kHz",
    dir: "4kto16k",
    samples: ["p360_152", "p361_093", "p361_148", "p362_216", "p374_283"],
  },
  {
    id: "2kto16k",
    title: "III. 2 kHz to 16 kHz",
    dir: "2kto16k",
    samples: ["p361_158", "p363_209", "p364_164", "p376_299", "s5_334"],
  },
];
