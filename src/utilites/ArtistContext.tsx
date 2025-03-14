import { createContext, useContext, useState, ReactNode } from "react";

interface ArtistContextType {
  currentArtist: string;
  setCurrentArtist: (artist: string) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);
const defaultArtists = [
  "Taylor Swift",
  "Kanye West",
  "Ed Sheeran",
  "Drake",
  "Ariana Grande",
  "Beyonce",
  "Justin Bieber",
  "Rihanna",
  "Katy Perry",
  "Lady Gaga",
];

const getRandomArtist = () => {
  const randomIndex = Math.floor(Math.random() * defaultArtists.length);
  return defaultArtists[randomIndex];
};

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [currentArtist, setCurrentArtist] = useState(getRandomArtist());

  return (
    <ArtistContext.Provider value={{ currentArtist, setCurrentArtist }}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtist() {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error("useArtist must be used within an ArtistProvider");
  }
  return context;
}
