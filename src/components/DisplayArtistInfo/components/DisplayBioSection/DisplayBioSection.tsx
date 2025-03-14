import { useEffect, useState } from "react";
import { getArtistInfo } from "./utilities/utilities";
import { useAlbum } from "../../../../utilites/AlbumContext";
import "./styles.css";

const DisplayBioSection = () => {
  const [artistBio, setArtistBio] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { artistObject } = useAlbum();

  useEffect(() => {
    getArtistInfo(artistObject.name).then(setArtistBio);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>About {artistObject.name}</h1>
      <div
        className="bio-content"
        dangerouslySetInnerHTML={{ __html: artistBio }}
      />
    </>
  );
};

export default DisplayBioSection;
