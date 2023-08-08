import { useState, useEffect } from "react";

export const useIsNowPlayingChapter = (
  start: number,
  end: number | undefined,
  time: number | undefined | null
) => {
  const [isNowPlayingChapter, setIsNowPlayingChapter] =
    useState<boolean>(false);

  const getIsNowPlayingChapter = () => {
    if (end && time) {
      if (time >= start && time < end) {
        setIsNowPlayingChapter(true);
      } else setIsNowPlayingChapter(false);
    } else if (!end && time) {
      if (time > start) {
        setIsNowPlayingChapter(true);
      } else setIsNowPlayingChapter(false);
    }
  };

  useEffect(() => {
    getIsNowPlayingChapter();
  }, [time]);

  return isNowPlayingChapter;
};
