import { Chapter } from "../services/youtube";
import playing_icon from "../assets/playing_icon.png";

type Props = {
  chapters: Chapter[];
  onClick: (moveTo: number, palying: boolean) => void;
  playerTime: number | undefined;
};
export const ChapterPlayLists = ({ chapters, onClick, playerTime }: Props) => {
  return (
    <div className="pt-12">
      <ul role="list" className="divide-y divide-gray-800">
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
              <ChapterPlayListItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ChapterPlayListItem = ({ item }: { item: Chapter }) => {
  return (
    <>
      <div className="text-base">
        <img
          src={playing_icon}
          alt="playing_icon"
          className="playing_icon pr-4"
        ></img>
        {item.title}
      </div>
    </>
  );
};
