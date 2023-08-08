import { Chapter } from "../services/youtube";

type Props = {
  chapters: Chapter[]
  onClick: (moveTo: number) => void
}
export const ChapterPlayLists = ({ chapters, onClick }: Props) => {
  return (
    <div className="pt-12">
      <ul role="list" className="divide-y divide-gray-800">
        {chapters.map(item => {
          return (
            <li
              key={item.title}
              className="flex pl-4 py-6 cursor-pointer"
              onClick={() => onClick(item.start)}
            >
              <ChapterPlayListItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ChapterPlayListItem = ({ item }: { item: Chapter }) => 
  <div className="text-base text-gray-500">{item.title}</div>
