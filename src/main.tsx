import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import RouterConfig from "./configs/route-configs";
import { Toaster } from "./components/ui/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterConfig />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);
