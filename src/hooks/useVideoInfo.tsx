import { useState, useEffect } from "react";
import { VideoListResponse, video } from "../services/youtube";

export const useVideoInfo = (videoId: string) => {
  const [videoForShake, setvideoForShake] = useState<VideoListResponse["items"][0]["snippet"]>();

  const getVideoInfo = async () => {
    setvideoForShake(await video(videoId));
  };

  useEffect(() => {
    getVideoInfo();
  }, [videoId]);

  return videoForShake;
}
