import { useState, useEffect } from "react";
import parseYouTubeChapters from "../utils/parseYouTubeChapters";
import { Chapter } from "../services/youtube";

export const useChapters = (description: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const getChaptersInfo = async () => {
    const chaptersInfo = await parseYouTubeChapters(description);
    setChapters(chaptersInfo);
  };

  useEffect(() => {
    getChaptersInfo();
  }, [description]);

  return chapters;
};
