import { Chapter } from "../services/youtube";
import play_icon from "../assets/play_icon.png";
import pause_icon from "../assets/pause_icon.png";
import playing_icon from "../assets/playing_icon.png";
import { useState } from "react";

type Props = {
  chapters: Chapter[];
  onClick: (moveTo: number, playing: boolean) => void;
  currentChapter: Chapter | undefined;
  nowPlayerPlaying: boolean;
  className?: string;
};
export const ChapterPlayLists = ({
  chapters,
  onClick,
  currentChapter,
  nowPlayerPlaying,
  className,
}: Props) => {
  return (
    <div className={className}>
      <ul role="list" className="divide-y text-[#62656f]">
        {chapters.map((item, i) => {
          const isCurrentChapter = item.start === currentChapter?.start;

          return (
            <ChapterPlayListItem
              key={i}
              item={item}
              onClick={() => onClick(item.start, isCurrentChapter)}
              isCurrentChapter={isCurrentChapter}
              nowPlayerPlaying={nowPlayerPlaying}
            />
          );
        })}
      </ul>
    </div>
  );
};

const ChapterPlayListItem = ({
  item,
  nowPlayerPlaying,
  isCurrentChapter,
  onClick,
}: {
  item: Chapter;
  nowPlayerPlaying: boolean;
  isCurrentChapter: boolean;
  onClick: () => void;
}) => {
  const [hover, setHover] = useState(false);
  const iconSrc = hover
    ? isCurrentChapter && nowPlayerPlaying
      ? pause_icon
      : play_icon
    : playing_icon;

  return (
    <li
      className={`
        flex
        pl-4
        py-6
        cursor-pointer
        border-[#212121]
        border-t
        hover:bg-[#17191d]
        ${isCurrentChapter ? "text-white" : "text-[#62656f]"}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        {(hover || isCurrentChapter) && (
          <img
            src={iconSrc}
            className={`pr-4 inline ${isCurrentChapter ? "" : "opacity-40"}`}
          />
        )}
        {item.title}
      </span>
    </li>
  );
};
