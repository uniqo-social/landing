
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force correct tab title (prevents stale caches)
if (typeof document !== "undefined") {
  document.title = "Uniqo";
}

createRoot(document.getElementById("root")!).render(<App />);
  
