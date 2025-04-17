import Home from "./components/Home";
import "./App.css";
import { inject } from "@vercel/analytics";

// Initialize Vercel Analytics
inject();

function App() {
  return <Home />;
}

export default App;
