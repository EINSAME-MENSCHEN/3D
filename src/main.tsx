
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "@fontsource/noto-sans-sc/chinese-simplified-400.css";
  import "@fontsource/noto-sans-sc/chinese-simplified-500.css";
  import "@fontsource/noto-sans-sc/chinese-simplified-700.css";
  import "@fontsource/noto-sans-sc/chinese-simplified-800.css";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
