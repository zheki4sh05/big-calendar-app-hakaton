import { Outlet } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import Header from "./Header";
import MainBody from "./MainBody";

const theme = createTheme(ruRU);

function Layout() {
  return (
    <ThemeProvider theme={theme}>
         <Header />
      <MainBody>
       
        <Outlet />
      </MainBody>
    </ThemeProvider>
  );
}

export default Layout;
