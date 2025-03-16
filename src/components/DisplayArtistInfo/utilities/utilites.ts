const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export function filterNoImages(data: any[]) {
  return data.filter((data) => data.images.length > 0);
}

export async function getArtistTopTracks(artistId: string) {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  return data.tracks;
}

export async function getArtistsAlbums(name: string) {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${name}/albums`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await response.json();
  const filteredAlbums = filterNoImages(data.items);
  return filteredAlbums;
}

interface ArtistObject {
  id: string;
  name: string;
}

export async function updateArtistSearchCount(artistObject: ArtistObject) {
  fetch(`http://127.0.0.1:8000/artists/${artistObject.id}/searches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistId: artistObject.id,
      artistName: artistObject.name,
    }),
  }).catch((error) => {
    console.error("Error updating artist search count:", error);
  });
}
