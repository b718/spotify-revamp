import { useEffect, useState } from "react";
import { getArtistTopTracks, getArtistsAlbums } from "./utilities/utilites";
import { useAlbum } from "../../utilites/AlbumContext";
import DisplayAlbumsSection from "./components/DisplayAlbumsSection/DisplayAlbumsSection";
import DisplayTopTracksSection from "./components/DisplayTopTracksSection/DisplayTopTracksSection";

import "./styles.css";
import DisplayBioSection from "./components/DisplayBioSection/DisplayBioSection";

const DisplayArtistInfo = () => {
  const { artistObject } = useAlbum();
  const [artistTopTracks, setArtistTopTracks] = useState<any[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      try {
        const artistTopTracks = await getArtistTopTracks(artistObject.id);
        const artistAlbums = await getArtistsAlbums(artistObject.id);
        setArtistTopTracks(artistTopTracks);
        setArtistAlbums(artistAlbums);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
      setLoading(false);
    };

    fetchArtistData();
  }, [artistObject]);

  if (loading) return <div className="artist-loading">Loading...</div>;
  if (!artistObject.id)
    return <div className="artist-error">Artist not found</div>;

  return (
    <div className="artist-container">
      <DisplayBioSection />
      <DisplayTopTracksSection artistTopTracks={artistTopTracks} />
      <DisplayAlbumsSection artistAlbums={artistAlbums} />
    </div>
  );
};

export default DisplayArtistInfo;
