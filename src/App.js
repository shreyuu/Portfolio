import Home from "./components/Home.jsx";
import "./App.css";
import { inject } from "@vercel/analytics";

// Initialize Vercel Analytics
inject();

function App() {
  return <Home />;
}

export default App;
