import axios from "axios";

export async function shortenUrl(url: string) {
  try {
    const resp = await axios.post("http://localhost:3001/shorten", {
      longUrl: url,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
