import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "lenis/dist/lenis.css";
import "./index.css";

// Start the React app
createRoot(document.getElementById("root")!).render(<App />);
