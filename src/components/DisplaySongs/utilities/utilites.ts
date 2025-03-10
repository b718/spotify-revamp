const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

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

export async function searchArtist(name: string) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist%2Calbum&limit=30`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  
    const data = await response.json();
    const filteredArtists = filterNoImages(data.artists.items);
    return filteredArtists;
  }