import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ArtistProvider } from "./utilites/ArtistContext.tsx";
import { AlbumProvider } from "./utilites/AlbumContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlbumProvider>
      <ArtistProvider>
        <App />
      </ArtistProvider>
    </AlbumProvider>
  </StrictMode>
);
