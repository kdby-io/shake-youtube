import { useState, useEffect } from "react";
import parseYouTubeChapters from "../utils/parseYouTubeChapters";

function useChapters(description: string) {
  const [chapters, setChapters] = useState<any>([]);

  const getChaptersInfo = async () => {
    setChapters(parseYouTubeChapters(description));
  };

  useEffect(() => {
    getChaptersInfo();
  }, [description]);

  return chapters;
}

export default useChapters;
