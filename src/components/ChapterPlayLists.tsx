import { Chapter } from "../services/youtube";
import play_icon from "../assets/play_icon.png";
import pause_icon from "../assets/pause_icon.png";
import playing_icon from "../assets/playing_icon.png";

type Props = {
  chapters: Chapter[];
  onClick: (moveTo: number, palying: boolean) => void;
  playerTime: number | undefined;
  nowPlayerPlaying: boolean;
};
export const ChapterPlayLists = ({
  chapters,
  onClick,
  playerTime,
  nowPlayerPlaying,
}: Props) => {
  return (
    <div className="pt-12">
      <ul role="list" className="divide-y chapter-list">
        {chapters.map((item) => {
          const playingChapter = playerTime
            ? item.start <= playerTime && playerTime <= item.end
            : false;
          return (
            <li
              key={item.title}
              className={
                playingChapter
                  ? "flex pl-4 py-6 cursor-pointer playingChapter"
                  : "flex pl-4 py-6 cursor-pointer not-playingChapter"
              }
              onClick={() => onClick(item.start, playingChapter)}
            >
              <ChapterPlayListItem
                item={item}
                playingChapter={playingChapter}
                nowPlayerPlaying={nowPlayerPlaying}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ChapterPlayListItem = ({
  item,
  nowPlayerPlaying,
  playingChapter,
}: {
  item: Chapter;
  nowPlayerPlaying: boolean;
  playingChapter: boolean;
}) => {
  return (
    <>
      <div
        className={
          nowPlayerPlaying
            ? "text-base text-left now-playing"
            : "text-base text-left not-now-playing"
        }
      >
        <img
          src={playing_icon}
          alt="playing_icon"
          className="playing_icon pr-4"
        ></img>
        <img src={play_icon} alt="play_icon" className="play_icon pr-4"></img>
        {playingChapter && (
          <img
            src={pause_icon}
            alt="pause_icon"
            className="pause_icon pr-4"
          ></img>
        )}
        <span>{item.title}</span>
      </div>
    </>
  );
};
