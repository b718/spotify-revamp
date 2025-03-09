import { useEffect, useState } from "react";
import { searchArtist } from "./utilities/utilites";
import "./styles.css";
import { useArtist } from "../../utilites/ArtistContext";

const SongImage = (song: any) => {
  return (
    <img src={song.images[0]?.url} alt={song.name} className="song-image" />
  );
};

const SongInfo = (song: any) => {
  return (
    <div className="song-info">
      <h2 className="song-name">{song.name}</h2>
      <p className="album-name">Album: {song.album?.name}</p>
      <div className="song-footer">
        <span className="release-date">
          {new Date(song.album?.release_date).getFullYear()}
        </span>
        <a
          href={song?.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-button"
        >
          Play on Spotify
        </a>
      </div>
    </div>
  );
};

const DisplaySongs = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentArtist } = useArtist();

  useEffect(() => {
    setLoading(true);
    searchArtist(currentArtist)
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load songs");
        setLoading(false);
      });
  }, [currentArtist]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  console.log(songs);

  return (
    <div className="container">
      <h1 className="title">Search Results for {currentArtist}</h1>
      <div className="songs-grid">
        {songs?.map((song) => (
          <div key={song.id} className="song-card">
            {SongImage(song)}
            {SongInfo(song)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplaySongs;
