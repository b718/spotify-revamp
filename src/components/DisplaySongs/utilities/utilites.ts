import * as keys from '../../../keys/keys.json'


const CLIENT_ID = keys.clientId
const CLIENT_SECRET = keys.clientSecret

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


export async function searchArtist(name: string) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  
    const data = await response.json();
    console.log(data.artists.items)
    return data.artists.items;
  }
  