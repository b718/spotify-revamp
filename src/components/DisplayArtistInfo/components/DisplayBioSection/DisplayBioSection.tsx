import { useEffect, useState } from "react";
import { getArtistInfo } from "./utilities/utilities";
import { useAlbum } from "../../../../utilites/AlbumContext";
import "./styles.css";

const DisplayBioSection = () => {
  const [artistBio, setArtistBio] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const { artistObject } = useAlbum();

  useEffect(() => {
    getArtistInfo(artistObject.name).then(setArtistBio);
    setLoading(false);
  }, []);

  if (loading || !artistBio) return <div>Loading...</div>;

  return (
    <div className="bio-wrapper">
      <h1 className="bio-title">About {artistObject.name}</h1>
      <div
        className="bio-content"
        dangerouslySetInnerHTML={{ __html: artistBio.bio.summary }}
      />
      <div className="bio-footer">
        Last Updated:{" "}
        {new Date(artistBio.bio.published).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default DisplayBioSection;
