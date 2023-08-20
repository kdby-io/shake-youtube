import { Chapter } from "../services/youtube";

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
          const playing = playerTime ? item.start <= playerTime && playerTime <= item.end : false;
          return (
            <li
              key={item.title}
              className="flex pl-4 py-6 cursor-pointer"
              onClick={() => onClick(item.start)}
            >
              <ChapterPlayListItem item={item} playing={playing} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ChapterPlayListItem = ({
  item,
  playing,
}: {
  item: Chapter;
  playing: boolean;
}) => {
  return (
    <>
      {playing ? (
        <div className="text-base text-white">{`(요고재생중) ${item.title}`}</div>
      ) : (
        <div className="text-base text-gray-500">{item.title}</div>
      )}
    </>
  );
};
