import { useState, useEffect } from "react";
import parseYouTubeChapters from "../utils/parseYouTubeChapters";

interface chapterItem {
  start: string;
  title: string;
}

function ChapterPlayLists(props: { description: string; videoId: string }) {
  const { description, videoId } = props;
  const [chapters, setChapters] = useState<any>([]);

  const getChaptersInfo = async () => {
    setChapters(parseYouTubeChapters(description));
  };

  useEffect(() => {
    getChaptersInfo();
  }, [description]);

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
      {item && (
        <div
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${videoId}&t=${item.start}s`
            )
          }
        >
          {`시작 시간: ${item.start} | 타이틀: ${item.title} `}
        </div>
      )}
    </>
  );
}

export default ChapterPlayLists;