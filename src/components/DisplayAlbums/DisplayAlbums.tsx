import { useEffect, useState } from "react";
import { useAlbum } from "../../utilites/AlbumContext";
import { getArtistsAlbums } from "./utilities/utilites";
import DisplayInformation from "../DisplayInformation/DisplayInformation";

const DisplayAlbums = () => {
  const { artistObject } = useAlbum();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getArtistsAlbums(artistObject.id)
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load albums");
        setLoading(false);
      });
  }, [artistObject.id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <DisplayInformation data={albums} title={`${artistObject.name} Albums`} />
    </>
  );
};

export default DisplayAlbums;
