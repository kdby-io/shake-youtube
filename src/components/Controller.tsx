import pause_icon from "../assets/pause_icon.png";
import playing_icon from "../assets/playing_icon.png";

type Props = {
  nowPlaying: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
};
export const Controller = ({
  nowPlaying,
  onPlayClick,
  onPauseClick,
}: Props) => {
  return (
    <div className="hidden">
      <div className="controller flex items-center justify-between bg-controller-bg rounded-3xl px-14 py-7 fixed bottom-6 w-10/12">
        <div className="chapter-info flex basis-60 gap-2">
          <div className="playing-animation">애니메이션</div>
          <div className="chapter-title">곡제목운길다길다길어</div>
        </div>
        <div className="main-controller flex justify-center">
          <button>전</button>
          <div
            className="circle-button w-14 h-14 rounded-full bg-youtube-red flex items-center justify-center cursor-pointer"
            onClick={nowPlaying ? () => onPauseClick() : () => onPlayClick()}
          >
            {nowPlaying ? (
              <div>
                <img src={pause_icon} alt="pause_icon"></img>
              </div>
            ) : (
              <div>
                <img src={playing_icon} alt="playing_icon"></img>
              </div>
            )}
          </div>
          <button>후</button>
        </div>
        <div className="volume flex basis-60 justify-end">볼륨</div>
      </div>
    </div>
  );
};
