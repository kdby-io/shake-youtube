interface chapterItem {
  start: string;
  title: string;
}

function ChapterPlayLists(props: { chapters: Array<any>; videoId: string }) {
  const { chapters, videoId } = props;

  return (
    <>
      {chapters.map((item: any) => {
        return (
          <div key={item.title}>
            <ChapterPlayListItem item={item} videoId={videoId} />
          </div>
        );
      })}
    </>
  );
}

function ChapterPlayListItem(props: { item: chapterItem; videoId: string }) {
  const { item, videoId } = props;
  return (
    <>
      <div
        onClick={() =>
          window.open(
            `https://www.youtube.com/watch?v=${videoId}&t=${item.start}s`
          )
        }
      >
        {`시작 시간: ${item.start} | 타이틀: ${item.title} `}
      </div>
    </>
  );
}

export default ChapterPlayLists;
