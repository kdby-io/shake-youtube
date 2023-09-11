import Lottie, { LottieRefCurrentProps } from "lottie-react";
import pause_icon from "../assets/pause_icon.png";
import play_icon from "../assets/play_icon.png";
import next_icon from "../assets/next.png";
import prev_icon from "../assets/prev.png";
// import sound_icon from "../assets/sound.png";
import { Chapter } from "../services/youtube";
import playingIconData from "../assets/playing.json";
import { useEffect, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

type Props = {
  nowPlaying: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
  chapters: Chapter[];
  playerTime: number;
  seekTo: (s: number) => void;
  setVolume: (volume: number | any) => void;
  volume: number|Promise<number>
  handleSoundIconCLick: () => void;
  isMuted: boolean | undefined;
};
export const Controller = ({
  nowPlaying,
  onPlayClick,
  onPauseClick,
  chapters,
  playerTime,
  seekTo,
  setVolume,
  volume,
  handleSoundIconCLick,
  isMuted,
}: Props) => {
  // console.log(isMuted)
  const currentChapterIndex = chapters.findIndex((item) => {
    return item.start <= playerTime && playerTime <= item.end;
  });
  const nextChapterIndex =
    currentChapterIndex === chapters.length - 1 ? 0 : currentChapterIndex + 1;
  const lastChapterIndex =
    currentChapterIndex === 0 ? chapters.length - 1 : currentChapterIndex - 1;

  const isChaptersExist: boolean = chapters.length !== 0 ? true : false;
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      nowPlaying ? lottieRef.current.play() : lottieRef.current.pause();
    }
  }, [nowPlaying]);

  return (
    <div className="">
      <div className="controller flex items-center justify-between bg-[#1A1B21] rounded-3xl px-14 py-7 fixed bottom-6 w-10/12">
        <div className="flex basis-1/3 items-center gap-6">
          {isChaptersExist ? (
            <>
              <Lottie
                className="h-12 w-12"
                lottieRef={lottieRef}
                autoplay={false}
                animationData={playingIconData}
              />
              <div>{chapters[currentChapterIndex]?.title}</div>
            </>
          ) : (
            <div className="text-[#8A9397] opacity-70">재생 중인 음악 없음</div>
          )}
        </div>
        <div className="flex items-center gap-6 justify-center">
          <img
            className="cursor-pointer"
            src={prev_icon}
            alt="prev_icon"
            onClick={() => seekTo(chapters[lastChapterIndex].start)}
          ></img>
          <div
            className="w-14 h-14 rounded-full bg-[#FF003D] flex items-center justify-center cursor-pointer"
            onClick={nowPlaying ? () => onPauseClick() : () => onPlayClick()}
          >
            {nowPlaying ? (
              <img src={pause_icon} alt="pause_icon"></img>
            ) : (
              <img src={play_icon} alt="play_icon"></img>
            )}
          </div>
          <img
            className="cursor-pointer"
            src={next_icon}
            alt="next_icon"
            onClick={() => seekTo(chapters[nextChapterIndex].start)}
          ></img>
        </div>
        <div className="flex basis-1/3 justify-end items-center gap-3">
          <div>
            {/* <img
              className="cursor-pointer"
              src={sound_icon}
              alt="sound_icon"
              onClick={() => handleSoundIconCLick()}
            ></img> */}
            {isMuted ? (
              <BiVolumeMute
                className="cursor-pointer w-6 h-6"
                onClick={() => handleSoundIconCLick()}
              />
            ) : (
              <BiVolumeFull
                className="cursor-pointer w-6 h-6"
                onClick={() => handleSoundIconCLick()}
              />
            )}
          </div>

          <Slider
            className="w-36"
            defaultValue={100}
            value={isMuted ? 0 : volume as number}
            trackStyle={{ backgroundColor: "#FF003D", height: 6 }}
            railStyle={{ backgroundColor: "#32373E", height: 6 }}
            onChange={(value) => {
              setVolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
