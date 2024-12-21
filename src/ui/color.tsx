export const colors: any = {
  primary: {
    _50: "#eae9f1",
    _300: "#aaa9c6",
    _500: "#6a689c",
    _700: "#2A2771",
    _900: "#1d1b4f",
  },
  neutral: {
    _50: "#eaebed",
    _100: "#d4d7da",
    _200: "#bfc3c8",
    _300: "#a9afb5",
    _400: "#949ca3",
    _500: "#7f8891",
    _600: "#69747E",
    _700: "#54606c",
    _800: "#3e4c59",
    _900: "#293847",
  },
  secondary: {
    _50: "#fdedea",
    _300: "#f8cac0",
    _500: "#f4a797",
    _700: "#ef846d",
    _800: "#d84d4d",
    _900: "#e84f2e",
  },
  tertiary: {
    _50: "#e9f7f6",
    _300: "#bce8e4",
    _500: "#8fd8d3",
    _700: "#62c8c1",
    _900: "#1eb1a6",
  },
  success: {
    _50: "#ECFDF5",
    _300: "#6EE7B7",
    _500: "#10B981",
    _700: "#047857",
    _900: "#064E3B",
  },
  warning: {
    _50: "#FFFBEB",
    _300: "#FCD34D",
    _500: "#F59E0B",
    _700: "#B45309",
    _900: "#78350F",
  },
  error: {
    _50: "#FFE9EA",
    _100: "#D8774D",
    _300: "#FEB7BB",
    _500: "#EF4444",
    _700: "#B91C1C",
    _800: "#d22929",
    _900: "#FDE9DD",
    _1000: "#d32f2f",
  },
  shades: {
    _0: "#FFFFFF",
    _100: "#000000",
    _200: "#0000004d",
  },
  accent: {
    _0: "#004F9F",
  },
  background: {
    _0: "#000000",
    _50: "#F3F4F7",
    _100: "#F9F8F4",
    _200: "#F2FAFF",
    _300: "#FAFAFA",
    _400: "#F7F9FC",
    _500: "#8796a5",
    _600: "#AAb4bE",
    _700: "#34317B",
    _800: "#F2F2F2",
    _900: "#FBFBFF",
    _1000: "#FCB697",
    _1100: "#E2E2E2",
    _1200: "#F5F5F5",
    _1300: "#0B093E",
    _1400: "#194790",
  },
  border: {
    _0: "#ECECEC",
    _100: "#7E7A7A",
    _200: "#040607",
    _300: "#4F5151",
    _400: "#E6E6E7",
    _500: "#3F3B8E",
  },
  chart: {
    _0: "#36358B",
    _100: "#FCCBB7",
    _200: "#6D270A",
  },
  action_button: {
    _0: "#AAA9C6",
    _100: "#6A689C",
    _200: "#33316f",
    _300: "#194790",
    _400: "#30599b",
  },
  captable_donut: {
    _0: "#D38F3F",
    _100: "#438BBA",
    _200: "#E8887A",
    _300: "#43ACBA",
    _400: "#5966D8",
  },
  grant_option_donut: {
    _0: "#5ABDCB",
    _100: "#DBC553",
    _200: "#FF6969",
    _300: "#BA43A0",
    _400: "#5966D8",
  },
  extra: {
    _0: "#727272",
    _100: "#FF6E4F",
    _200: "#5154B1",
    _300: "#242167",
    _400: "#4F4C9F",
    _500: "#5B5B5B",
    _600: "#818283",
    _700: "#E6E6E6",
    _800: "#2E57E8",
    _900: "#EDF1FF",
    _1000: "#B4B4B5",
    _1100: "#00519C",
    _1200: "#CDE7FF",
    _1300: "#0F9C92",
    _1400: "#4D63D8",
    _1500: "#9F9FB0",
    _1600: "#FF8616",
    _1700: "#B6B4F2",
    _1800: "#EEEEEE",
    _1900: "#888888",
    _2000: "#DEDEDE",
    _2100: "#FBCBA7",
    _2200: "#3C10B9",
    _2300: "#107CB9",
    _2400: "#B94D10",
    _2500: "#407BB7",
    _2600: "#E6E9FA",
    _2700: "#FA8C23",
    _2800: "#FAF6F0",
    _2900: "#5C29C9",
    _3000: "#EFE8FF",
    _3100: "#319B0C",
    _3200: "#D7FFC9",
    _3300: "#99941B",
    _3400: "#FFFDD9",
    _3500: "#6B950D",
    _3600: "#F8FFE8",
    _3700: "#EF5B38",
    _3800: "#1D1A5C",
    _3900: "#25CDC0",
    _4000: "#1967D2",
    _4100: "#F4BAA1",
    _4200: "#8B4122",
    _4300: "#3C388A",
    _4400: "#151C58",
  },
  group: {
    _0: "#670AC3",
    _100: "#088E7E",
    _200: "#F1E3FF",
    _300: "#E4FFFC",
  },
};

export type colorType =
  | "primary"
  | "neutral"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error"
  | "accent"
  | "background"
  | "border"
  | "chart"
  | "captable_donut"
  | "action_button"
  | "shades"
  | "extra"
  | "group"
  | "grant_option_donut";

export function getColor(type: colorType, code: number) {
  let variant = `_${code}`;
  if (colors[type]) {
    return colors[type][variant] ? colors[type][variant] : colors.primary._50;
  }
  throw new Error("color not defined");
}
