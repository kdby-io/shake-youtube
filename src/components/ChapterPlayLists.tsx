interface chapterItem {
  start: string;
  title: string;
}

function ChapterPlayLists(props: {
  chapters: Array<any>;
  videoId: string;
  onClick: any;
}) {
  const { chapters, videoId, onClick } = props;

  return (
    <div className="pt-12">
      <ul role="list" className="divide-y divide-gray-800">
        {chapters.map((item: any) => {
          return (
            <li
              key={item.title}
              className="flex pl-4 py-6 cursor-pointer"
              onClick={() => onClick(item.start)}
            >
              <ChapterPlayListItem item={item} videoId={videoId} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ChapterPlayListItem(props: { item: chapterItem; videoId: string }) {
  const { item } = props;
  return (
    <>
      <div className="text-base text-gray-500">{`${item.title}`}</div>
    </>
  );
}

export default ChapterPlayLists;
