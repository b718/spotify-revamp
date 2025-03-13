import "./App.css";
import DisplaySongs from "./components/DisplaySongs/DisplaySongs";
import ArtistSearchBar from "./components/ArtistSearchBar/ArtistSearchBar";
import DisplayArtistInfo from "./components/DisplayArtistInfo/DisplayArtistInfo";

import { useAlbum } from "./utilites/AlbumContext";

function App() {
  const { artistObject } = useAlbum();

  return (
    <>
      <ArtistSearchBar />
      {!artistObject.id && <DisplaySongs />}
      {artistObject.id && <DisplayArtistInfo />}
    </>
  );
}

export default App;
