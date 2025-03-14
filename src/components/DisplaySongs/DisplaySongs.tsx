import { useEffect, useState } from "react";
import { searchArtist } from "./utilities/utilites";
import { useArtist } from "../../utilites/ArtistContext";
import { useAlbum } from "../../utilites/AlbumContext";
import DisplayInformation from "../DisplayInformation/DisplayInformation";

const DisplaySongs = () => {
  const { currentArtist } = useArtist();
  const { setArtistObject } = useAlbum();
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    searchArtist(currentArtist)
      .then((data) => {
        setArtists(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load songs");
        setLoading(false);
      });
  }, [currentArtist]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <DisplayInformation
      data={artists}
      title={currentArtist}
      onClickFunction={setArtistObject}
    />
  );
};

export default DisplaySongs;
