import ResponsiveAppBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import Router from "./routes/Router";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/*toast*/
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import useLoggedIn from "./hooks/useLoggedIn";

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
  const loggIn = useLoggedIn();
  useEffect(() => {
    loggIn();
  }, []);
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <ResponsiveAppBar
            onThemeChange={changeTheme}
            darkMode={darkMode}
        
          />
        </header>
        <main>
          <Router />
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
