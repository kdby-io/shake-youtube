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
      <div style={{ paddingBottom: "30px" }}>
        ❤️❤️❤️❤️리스트 클릭해보셔유❤️❤️❤️❤️
      </div>
      {chapters.map((item: any) => {
        return (
          <div key={item.title}>
            <ChapterPlayListItem
              item={item}
              videoId={videoId}
              onClick={onClick}
            />
          </div>
        );
      })}
    </>
  );
}

function ChapterPlayListItem(props: {
  item: chapterItem;
  videoId: string;
  onClick: any;
}) {
  const { item, onClick } = props;
  return (
    <>
      <div
        onClick={() => onClick(item.start)}
      >{`시작 시간: ${item.start} | 타이틀: ${item.title} `}</div>
    </>
  );
}

export default ChapterPlayLists;
