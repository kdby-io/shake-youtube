import { useState, useEffect } from "react";
import { video } from "../services/youtube";

function useVideoInfo(videoId: string) {
  const [videoForShake, setvideoForShake] = useState<any>({});

  const getVideoInfo = async () => {
    setvideoForShake(await video(videoId));
  };

  useEffect(() => {
    getVideoInfo();
  }, [videoId]);

  return videoForShake;
}

export default useVideoInfo;
