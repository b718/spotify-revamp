import "./styles.css";

type DisplayTopTracksSectionProps = {
  artistTopTracks: any[];
};

const DisplayTopTracksSection = ({
  artistTopTracks,
}: DisplayTopTracksSectionProps) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section className="tracks-section">
      <h2 className="section-title">Top Tracks</h2>
      <div className="tracks-list">
        {artistTopTracks.map((track, index) => (
          <div key={track.id} className="track-item">
            <span className="track-number">{index + 1}</span>
            <img src={track.album.images[0].url} alt={track.name} />
            <div className="track-info">
              <h4>{track.name}</h4>
              <p>{track.album.name}</p>
            </div>
            <span className="track-duration">
              {formatDuration(track.duration_ms)}
            </span>
            {track.preview_url && (
              <audio controls className="track-preview">
                <source src={track.preview_url} type="audio/mpeg" />
              </audio>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplayTopTracksSection;
