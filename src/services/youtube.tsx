import axios from "axios";

export type Chapter = {
  start: number
  title: string
}

const YoutubeApiClient = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
});

export type VideoListResponse = {
  items: {
    id: string
    snippet: {
      publishedAt: string
      channelId: string
      title: string
      description: string
      thumbnails: {
        default: {
          url: string
          width: number
          height: number
        }
        maxres: {
          url: string
          width: number
          height: number
        }
      }
    }
  }[]
}
export const video = async (videoId: string) => {
  try {
    const response = await YoutubeApiClient.get<VideoListResponse>("videos", {
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
