import axios from "axios";

export async function shortenUrl(url: string) {
  try {
    const resp = await axios.post("https://short-url.fijero.dev/shorten", {
      longUrl: url,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
