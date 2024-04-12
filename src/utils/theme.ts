import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#3182CE",
    800: "#2A4365",
    900: "#1A365D"
  },
  secondary: {
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169"
  }
};

const theme = extendTheme({ colors });

export default theme;