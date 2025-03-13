import "./styles.css";

type DisplayInformationProps = {
  data: any[];
  title: string;
  onClickFunction?: (artistObject: { id: string; name: string }) => void;
};

const ImageSection = (artist: any) => {
  return (
    <img
      src={artist.images[0]?.url}
      alt={artist.name}
      className="artist-image"
    />
  );
};

const InformationSection = (artist: any) => {
  return (
    <div className="artist-info">
      <h2 className="artist-name">{artist.name}</h2>
      <div className="artist-footer">
        <div className="button-group">
          <a
            href={artist?.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-button"
          >
            Play on Spotify
          </a>
          <button className="learn-more-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

const DisplayInformation = ({
  data,
  title,
  onClickFunction,
}: DisplayInformationProps) => {
  return (
    <div className="container">
      <h1 className="title">
        Search Results for <i>{title}</i>
      </h1>
      <div className="artists-grid">
        {data?.map((information) => (
          <div
            key={information.id}
            className="artist-card"
            onClick={() => {
              if (onClickFunction) {
                onClickFunction({
                  id: information.id,
                  name: information.name,
                });
              }
            }}
          >
            {ImageSection(information)}
            {InformationSection(information)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayInformation;
