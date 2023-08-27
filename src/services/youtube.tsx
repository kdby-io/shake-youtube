import axios from "axios";

export type Chapter = {
  title: string;
  start: number;
  end: number;
};

const YoutubeApiClient = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
});

export type VideoListResponse = {
  items: {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        maxres: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
      };
      comments: string[];
    };
  }[];
};

export type Comment = {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
};

export const video = async (videoId: string) => {
  try {
    const videoResponse = await YoutubeApiClient.get<VideoListResponse>(
      "videos",
      {
        params: {
          part: "snippet",
          id: videoId,
        },
      }
    );

    const commentResponse = await YoutubeApiClient.get<any>("commentThreads", {
      params: {
        part: "snippet",
        videoId: videoId,
        textFormat: "plainText",
        order: "relevance",
      },
    });

    const comments: any[] = commentResponse.data.items.map((item: any) => {
      let comment = item.snippet.topLevelComment.snippet.textOriginal;
      comment = comment.replace(/\r/g, "");
      return comment;
    });

    const response: any = videoResponse.data.items[0].snippet;
    response.comments = comments;

    return response;
  } catch (error) {
    console.log(error);
  }
};
