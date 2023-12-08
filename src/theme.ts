import { Montserrat } from "next/font/google";
import { Krona_One } from "next/font/google";
import { Kufam } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const kronaOne = Krona_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const kufam = Kufam({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
    offwhite: Palette["primary"];
    tertiary_1: Palette["primary"];
    tertiary_2: Palette["primary"];
  }
  interface PaletteOptions {
    gray: PaletteOptions["primary"];
    offwhite: PaletteOptions["primary"];
    tertiary_1: PaletteOptions["primary"];
    tertiary_2: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsColorOverrides {
    offwhite: true;
    gray: true;
    tertiary_1: true;
    tertiary_2: true;
  }
}

declare module "@mui/material/IconButton" {
  // eslint-disable-next-line no-unused-vars
  interface IconButtonPropsColorOverrides {
    offwhite: true;
    gray: true;
    tertiary_1: true;
    tertiary_2: true;
  }
}

// Create a theme instance.
let theme = createTheme({
  palette: {
    background: {
      default: "#484848",
    },
    primary: {
      main: "#D9D9D9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#c4ab6c",
      contrastText: "#fff",
    },
    tertiary_1: {
      main: "#c6c7c9",
      contrastText: "#fff",
    },
    tertiary_2: {
      main: "#73858f",
      contrastText: "#fff",
    },
    gray: {
      light: "#fafafa",
      main: "#f5f5f5",
      dark: "#d5d5d5",
      contrastText: "#929295",
    },
    offwhite: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: kronaOne.style.fontFamily,
    h1: {
      fontSize: 64,
      fontWeight: 600,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
    },
    h3: {
      fontSize: 36,
    },
    h4: {
      fontSize: 28,
    },
    h5: {
      fontSize: 24,
    },
    h6: {
      fontSize: 20,
    },
    button: {
      fontSize: 16,
      textTransform: "none",
      fontWeight: 600,
    },
  },
  // components: {
  //   MuiUseMediaQuery: {
  //     defaultProps: {
  //       defaultMatches: true,
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 50,
  //         paddingTop: "8px",
  //         paddingBottom: "8px",
  //       },
  //     },
  //   },
  // },
});

theme = responsiveFontSizes(theme);

export default theme;
