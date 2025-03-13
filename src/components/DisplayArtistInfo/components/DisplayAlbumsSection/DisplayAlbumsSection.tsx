import React from "react";
import "./styles.css";

type DisplayAlbumsSectionProps = {
  artistAlbums: any[];
};

const DisplayAlbumsSection = ({ artistAlbums }: DisplayAlbumsSectionProps) => {
  return (
    <section className="albums-section">
      <h2 className="section-title">Albums</h2>
      <div className="albums-grid">
        {artistAlbums.map((album) => (
          <div key={album.id} className="album-card">
            <img src={album.images[0].url} alt={album.name} />
            <div className="album-info">
              <h3>{album.name}</h3>
              <p>{new Date(album.release_date).getFullYear()}</p>
              <p>{album.total_tracks} tracks</p>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-link"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplayAlbumsSection;
