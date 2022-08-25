import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

interface Props {
  children: JSX.Element;
}

const MuiThemeProvider = ({ children }: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6200EE",
      },
      secondary: {
        main: "#03DAC5",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
