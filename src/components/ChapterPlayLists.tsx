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
    <>
      <ul role="list" className="divide-y divide-gray-500">
        {chapters.map((item: any) => {
          return (
            <li
              key={item.title}
              className="flex justify-between gap-x-6 py-5 cursor-pointer"
              onClick={() => onClick(item.start)}
            >
              <ChapterPlayListItem item={item} videoId={videoId} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ChapterPlayListItem(props: { item: chapterItem; videoId: string }) {
  const { item } = props;
  return (
    <>
      <div>{`${item.title} `}</div>
    </>
  );
}

export default ChapterPlayLists;
