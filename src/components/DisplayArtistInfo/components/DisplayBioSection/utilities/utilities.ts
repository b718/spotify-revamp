const LAST_FM_API_KEY = import.meta.env.VITE_LAST_FM_API_KEY;

export async function getArtistInfo(artistName: string) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${LAST_FM_API_KEY}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.artist;
}
