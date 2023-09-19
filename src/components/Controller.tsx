import Lottie, { LottieRefCurrentProps } from "lottie-react";
import pause_icon from "../assets/pause_icon.png";
import play_icon from "../assets/play_icon.png";
import next_icon from "../assets/next.png";
import prev_icon from "../assets/prev.png";
import { Chapter } from "../services/youtube";
import playingIconData from "../assets/playing.json";
import { useEffect, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

type Props = {
  nowPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onMovePrev: () => void;
  onMoveNext: () => void;
  currentChapter: Chapter | undefined;
  setVolume: (volume: number) => void;
  volume: number;
  onMute: () => void;
  onUnmute: () => void;
  muted: boolean;
  isVideoReady: boolean;
  isChaptersExist: boolean;
};
export const Controller = ({
  nowPlaying,
  onPlay,
  onPause,
  onMovePrev,
  onMoveNext,
  currentChapter,
  setVolume,
  volume,
  onMute,
  onUnmute,
  muted,
  isVideoReady,
  isChaptersExist,
}: Props) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      nowPlaying ? lottieRef.current.play() : lottieRef.current.pause();
    }
  }, [nowPlaying]);

  return (
    <div className="">
      <div className="controller flex items-center justify-between bg-[#1A1B21] rounded-3xl px-14 py-7 fixed bottom-6 w-10/12">
        <div className="flex basis-1/3 items-center gap-6 min-w-0">
          {isVideoReady ? (
            isChaptersExist ? (
              <>
                <Lottie
                  className="h-12 w-12 flex-shrink-0"
                  lottieRef={lottieRef}
                  autoplay={false}
                  animationData={playingIconData}
                />
                <div className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  {currentChapter ? currentChapter.title : ""}
                </div>
              </>
            ) : (
              <div className="text-[#8A9397] opacity-70">No music found</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex items-center gap-6 justify-center">
          <img
            className="cursor-pointer"
            src={prev_icon}
            alt="prev_icon"
            onClick={onMovePrev}
          />
          <div
            className="w-14 h-14 rounded-full bg-[#FF003D] flex items-center justify-center cursor-pointer"
            onClick={nowPlaying ? () => onPause() : () => onPlay()}
          >
            {nowPlaying ? (
              <img src={pause_icon} alt="pause_icon" />
            ) : (
              <img src={play_icon} alt="play_icon" />
            )}
          </div>
          <img
            className="cursor-pointer"
            src={next_icon}
            alt="next_icon"
            onClick={onMoveNext}
          />
        </div>
        <div className="flex basis-1/3 justify-end items-center gap-3">
          <div>
            {/* <img
              className="cursor-pointer"
              src={sound_icon}
              alt="sound_icon"
              onClick={() => handleSoundIconCLick()}
            ></img> */}
            {muted ? (
              <BiVolumeMute
                className="cursor-pointer w-6 h-6"
                onClick={onUnmute}
              />
            ) : (
              <BiVolumeFull
                className="cursor-pointer w-6 h-6"
                onClick={onMute}
              />
            )}
          </div>

          <Slider
            className="w-36"
            defaultValue={100}
            value={muted ? 0 : volume}
            trackStyle={{ backgroundColor: "#FF003D", height: 6 }}
            railStyle={{ backgroundColor: "#32373E", height: 6 }}
            onChange={(volume) => setVolume(volume as number)}
          />
        </div>
      </div>
    </div>
  );
};
