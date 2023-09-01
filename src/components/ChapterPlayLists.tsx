import { Chapter } from "../services/youtube";
import playing_icon from "../assets/playing_icon.png";
import pause_icon from "../assets/pause_icon.png";

type Props = {
  chapters: Chapter[];
  onClick: (moveTo: number, palying: boolean) => void;
  playerTime: number | undefined;
  nowPlaying: boolean;
};
export const ChapterPlayLists = ({
  chapters,
  onClick,
  playerTime,
  nowPlaying,
}: Props) => {
  return (
    <div className="pt-12">
      <ul role="list" className="divide-y chapter-list">
        {chapters.map((item) => {
          const playing = playerTime
            ? item.start <= playerTime && playerTime <= item.end
            : false;
          return (
            <li
              key={item.title}
              className={
                playing
                  ? "flex pl-4 py-6 cursor-pointer playing"
                  : "flex pl-4 py-6 cursor-pointer not-playing"
              }
              onClick={() => onClick(item.start, playing)}
            >
              <ChapterPlayListItem
                item={item}
                playing={playing}
                nowPlaying={nowPlaying}
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
  nowPlaying,
  playing,
}: {
  item: Chapter;
  nowPlaying: boolean;
  playing: boolean;
}) => {
  return (
    <>
      <div
        className={
          nowPlaying
            ? "text-base text-left now-playing"
            : "text-base text-left not-now-playing"
        }
      >
        <img
          src={playing_icon}
          alt="playing_icon"
          className="playing_icon pr-4"
        ></img>
        {playing && (
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
