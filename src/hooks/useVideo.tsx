import { useState, useEffect } from "react";
import parseYouTubeChapters from "../utils/parseYouTubeChapters";
import { Chapter, getVideo } from "../services/youtube";
import { useSearchParams } from "./useSearchParams";
import { shuffle as _shuffle } from "lodash";

export const useVideo = () => {
  const videoId = useSearchParams("v") ?? "SWqQQ6Yb-6g";
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const shuffle = () => {
    setChapters(_shuffle(chapters));
  };

  useEffect(() => {
    (async () => {
      const videoInfo = await getVideo(videoId);

      setTitle(videoInfo.title);
      setImageUrl(
        videoInfo?.thumbnails.maxres
          ? videoInfo?.thumbnails.maxres.url ?? ""
          : videoInfo?.thumbnails.medium.url ?? ""
      );

      const chapterTexts = [videoInfo.description, ...videoInfo.comments];

      for (const chapterText of chapterTexts) {
        const chaptersInfo = parseYouTubeChapters(chapterText);
        if (chaptersInfo.length >= 3) {
          setChapters(_shuffle(chaptersInfo));
          return;
        }
      }
    })();
  }, [videoId]);

  return {
    videoId,
    title,
    imageUrl,
    chapters,
    shuffle,
  };
};
