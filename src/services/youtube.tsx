import axios from "axios";

export type Chapter = {
  start: number
  title: string
}

const YoutubeApiClient = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
});

export const video = async (videoId: string) => {
  try {
    const response = await YoutubeApiClient.get("videos", {
      params: {
        part: "snippet",
        id: videoId,
      },
    });
    return response.data.items[0].snippet;
  } catch (error) {
    console.log(error);
  }
};
