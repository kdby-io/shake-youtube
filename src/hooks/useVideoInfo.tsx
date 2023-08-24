import { useState, useEffect } from "react";
import { VideoListResponse, video } from "../services/youtube";

export const useVideoInfo = (videoId: string) => {
  const [videoForShake, setvideoForShake] =
    useState<VideoListResponse["items"][0]["snippet"]>();

  const getVideoInfo = async () => {
    const videoInfo = await video(videoId);
    setvideoForShake(videoInfo);
  };

  useEffect(() => {
    getVideoInfo();
  }, [videoId]);

  return videoForShake;
};
