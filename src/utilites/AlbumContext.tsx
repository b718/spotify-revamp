import { createContext, useContext, useState, ReactNode } from "react";

interface AlbumContextType {
  artistObject: {
    id: string;
    name: string;
  };
  setArtistObject: (artistObject: { id: string; name: string }) => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export function AlbumProvider({ children }: { children: ReactNode }) {
  const [artistObject, setArtistObject] = useState({
    id: "",
    name: "",
  });

  return (
    <AlbumContext.Provider value={{ artistObject, setArtistObject }}>
      {children}
    </AlbumContext.Provider>
  );
}

export function useAlbum() {
  const context = useContext(AlbumContext);
  if (context === undefined) {
    throw new Error("useAlbum must be used within an AlbumProvider");
  }
  return context;
}
