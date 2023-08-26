import { useState, useEffect } from "react";
import parseYouTubeChapters from "../utils/parseYouTubeChapters";
import { Chapter } from "../services/youtube";

export const useChapters = (description: string, comments: string[]) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const getChapters = async () => {
    let chaptersInfo = await parseYouTubeChapters(description);

    if (chaptersInfo.length >= 3) {
      setChapters(chaptersInfo);
    } else if (comments.length >= 1) {
      comments.map(async (comment) => {
        chaptersInfo = await parseYouTubeChapters(comment);
        if (chaptersInfo.length >= 3) {
          setChapters(chaptersInfo);
          return;
        }
      });
    }
  };

  useEffect(() => {
    getChapters();
  }, [description, comments]);

  return chapters;
};
