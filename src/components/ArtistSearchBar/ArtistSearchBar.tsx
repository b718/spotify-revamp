import React, { useState } from "react";
import { useArtist } from "../../utilites/ArtistContext";
import "./styles.css";

const ArtistSearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { setCurrentArtist } = useArtist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentArtist(searchInput);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for an artist..."
          className="search-input"
          aria-label="Search for an artist"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default ArtistSearchBar;
