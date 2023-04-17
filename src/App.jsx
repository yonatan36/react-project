import ResponsiveAppBar from "./components/NavBar/NavBar";
import { Container } from "@mui/material";
import Router from "./routes/Router";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/*toast*/
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const light = {
  palette: {
    mode: "light",
  },
};
const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer />
      <Container>
        <header>
          <ResponsiveAppBar onThemeChange={changeTheme} darkMode={darkMode} />
        </header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
