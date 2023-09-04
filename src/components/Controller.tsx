import Lottie, { LottieRefCurrentProps } from "lottie-react";
import pause_icon from "../assets/pause_icon.png";
import play_icon from "../assets/play_icon.png";
import { Chapter } from "../services/youtube";
import playingIconData from '../assets/playing.json'
import { useEffect, useRef } from "react";

type Props = {
  nowPlaying: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
  chapters: Chapter[];
  playerTime: number;
  seekTo: (s: number) => void;
};
export const Controller = ({
  nowPlaying,
  onPlayClick,
  onPauseClick,
  chapters,
  playerTime,
  seekTo,
}: Props) => {
  const currentChapterIndex = chapters.findIndex((item) => {
    return item.start <= playerTime && playerTime <= item.end;
  });
  const nextChapterIndex =
    currentChapterIndex === chapters.length - 1 ? 0 : currentChapterIndex + 1;
  const lastChapterIndex =
    currentChapterIndex === 0 ? chapters.length - 1 : currentChapterIndex - 1;
  
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      nowPlaying ? lottieRef.current.play() : lottieRef.current.pause()
    }
  }, [nowPlaying])

  return (
    <div className="hidden">
      <div className="controller flex items-center justify-between bg-[#1A1B21] rounded-b-3xl px-14 py-7 fixed bottom-6 w-10/12">
        <div className="flex basis-1/3 gap-2">
          <Lottie
            className="h-12 w-12"
            lottieRef={lottieRef}
            autoplay={false}
            animationData={playingIconData}
          />
          <div>
            {chapters[currentChapterIndex]?.title}
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={() => seekTo(chapters[lastChapterIndex].start)}>
            전
          </button>
          <div
            className="w-14 h-14 rounded-full bg-[#FF003D] flex items-center justify-center cursor-pointer"
            onClick={nowPlaying ? () => onPauseClick() : () => onPlayClick()}
          >
            {nowPlaying ? (
              <div>
                <img src={pause_icon} alt="pause_icon"></img>
              </div>
            ) : (
              <div>
                <img src={play_icon} alt="play_icon"></img>
              </div>
            )}
          </div>
          <button onClick={() => seekTo(chapters[nextChapterIndex].start)}>
            후
          </button>
        </div>
        <div className="flex basis-1/3 justify-end">볼륨</div>
      </div>
    </div>
  );
};
