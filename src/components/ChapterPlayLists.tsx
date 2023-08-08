import { Chapter } from "../services/youtube";
import { useIsNowPlayingChapter } from "../hooks/useIsNowPlayingChapter";

type Props = {
  chapters: Chapter[];
  onClick: (moveTo: number) => void;
  playerTime: number | undefined;
};
export const ChapterPlayLists = ({ chapters, onClick, playerTime }: Props) => {
  return (
    <div className="pt-12">
      <ul role="list" className="divide-y divide-gray-800">
        {chapters.map((item) => {
          return (
            <li
              key={item.title}
              className="flex pl-4 py-6 cursor-pointer"
              onClick={() => onClick(item.start)}
            >
              <ChapterPlayListItem item={item} playerTime={playerTime} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ChapterPlayListItem = ({
  item,
  playerTime,
}: {
  item: Chapter;
  playerTime: number | undefined;
}) => {
  const isNowPlayingChapter: Boolean = useIsNowPlayingChapter(
    item.start,
    item.end,
    playerTime
  );

  return (
    <>
      {isNowPlayingChapter ? (
        <div className="text-base text-white">{`(요고재생중) ${item.title}`}</div>
      ) : (
        <div className="text-base text-gray-500">{item.title}</div>
      )}
    </>
  );
};
