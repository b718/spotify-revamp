import "./App.css";
import DisplaySongs from "./components/DisplaySongs/DisplaySongs";
import ArtistSearchBar from "./components/ArtistSearchBar/ArtistSearchBar";
import DisplayAlbums from "./components/DisplayAlbums/DisplayAlbums";
import { useAlbum } from "./utilites/AlbumContext";

function App() {
  const { artistObject } = useAlbum();

  return (
    <>
      <ArtistSearchBar />
      {!artistObject.id && <DisplaySongs />}
      {artistObject.id && <DisplayAlbums />}
    </>
  );
}

export default App;
