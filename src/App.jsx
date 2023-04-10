import ResponsiveAppBar from "./components/NavBar/NavBar";
import { Container } from "@mui/material";
import Router from "./routes/Router";


function App() {
  return (
    <Container>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <Router />
      </main>
      <footer></footer>
    </Container>
  );
}

export default App;
