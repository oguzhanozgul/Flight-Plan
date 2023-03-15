import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      "#E46846",
      "#C87E95",
      "#CA5F7F",
      "#D23B69",
      "#DB1A54",
      "#DD0244",
      "#B31645",
      "#932244",
      "#7A2841",
      "#672C3D",
    ],
  },
  // This will be used as a default color for all components. Change it to your liking.
  // Reference for all available colors: https://mantine.dev/theming/colors/#default-colors
  primaryColor: "brand",
  primaryShade: { light: 4, dark: 5 },
  headings: {
    // This will be used as a default font family for all headings. Change it to your liking.
    // For Example: (Custom font)
    // fontFamily: "Sora, sans-serif",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: "42px" },
      h2: { fontSize: "32px" },
      h3: { fontSize: "28px" },
      h4: { fontSize: "24px" },
      h5: { fontSize: "18px" },
      h6: { fontSize: "16px" },
    },
  },
  // This will be used as a default font family for all components. Change it to your liking.
  // For Example: (Custom font)
  fontFamily: "Open Sans, sans-serif",
  fontSizes: {
    xs: "12",
    sm: "14",
    md: "16",
    lg: "18",
    xl: "20",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Text: {
      defaultProps: {
        color: "white",
      },
    },
  },
};

export default theme;
