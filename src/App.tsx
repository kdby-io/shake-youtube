import "./App.css";
import Youtube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { useVideoInfo } from "./hooks/useVideoInfo";
import { useChapters } from "./hooks/useChapters";
import { useSearchParams } from "./hooks/useSearchParams";
import { useEffect, useState } from "react";
import { ChapterPlayLists } from "./components/ChapterPlayLists";
import { Title } from "./components/Title";
import { shuffle } from "lodash";
import { Controller } from "./components/Controller";

const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "1280",
};

let timer: number;

function App() {
  const videoId = useSearchParams("v") ?? "SWqQQ6Yb-6g";
  const videoForShake = useVideoInfo(videoId);
  const chapters = useChapters(
    videoForShake?.description ?? "",
    videoForShake?.comments ?? []
  );
  const [shakedChapters, setShakedChapters] = useState(chapters);
  const startTimes = chapters.map((chapter) => chapter.start);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);
  const [playerTime, setPlayerTime] = useState<number>(-10);

  useEffect(() => {
    setShakedChapters(shuffle(chapters));
  }, [chapters]);

  useEffect(() => {
    (async () => {
      const nextSecond = Math.ceil(playerTime);
      const isAlmostEndChapter =
        startTimes.includes(nextSecond) &&
        0 < nextSecond - playerTime &&
        nextSecond - playerTime <= 0.2;

      if (isAlmostEndChapter) {
        const currentIndex = shakedChapters.findIndex(
          (chapter) => chapter.end === Math.ceil(playerTime)
        );
        const isCurrentIndexLast = currentIndex === shakedChapters.length - 1;
        const nextIndex = isCurrentIndexLast ? 0 : currentIndex + 1;
        const nextChapter = shakedChapters[nextIndex];
        player?.seekTo(nextChapter.start, true);
      }
    })();
  }, [playerTime]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = async () => {
    const newState = await player?.getPlayerState();

    if (newState === Youtube.PlayerState.ENDED) {
      clearInterval(timer);
      const currentIndex = shakedChapters.findIndex(
        (chapter) => chapter.end === Infinity
      );
      const isCurrentIndexLast = currentIndex === shakedChapters.length - 1;
      const nextIndex = isCurrentIndexLast ? 0 : currentIndex + 1;
      const nextChapter = shakedChapters[nextIndex];
      player?.seekTo(nextChapter.start, true);
    } else if (newState === Youtube.PlayerState.PLAYING) {
      setNowPlaying(true);
      timer = setInterval(async () => {
        const time = (await player?.getCurrentTime()) ?? 0;
        setPlayerTime(time);
      }, 200);
    } else if (newState === Youtube.PlayerState.PAUSED) {
      setNowPlaying(false);
      clearInterval(timer);
    } else {
      clearInterval(timer);
    }
  };

  const handleChapterClick = (s: number, playing: boolean) => {
    if (nowPlaying && playing) {
      player?.pauseVideo();
    } else if (!nowPlaying && playing) {
      player?.playVideo();
    } else {
      player?.seekTo(s, true);
      player?.playVideo();
    }
  };

  const handlePlayButtonClick = () => {
    player?.playVideo();
  };

  const handlePauseButtonClick = () => {
    player?.pauseVideo();
  };

  return (
    <>
      <div className="root_new max-w-screen-sm">
        <Title
          title={videoForShake?.title ?? ""}
          thumbnailImage={
            videoForShake?.thumbnails.maxres
              ? videoForShake?.thumbnails.maxres.url ?? ""
              : videoForShake?.thumbnails.medium.url ?? ""
          }
        />
        <ChapterPlayLists
          chapters={shakedChapters}
          onClick={handleChapterClick}
          playerTime={playerTime}
          nowPlaying={nowPlaying}
        />
        <Youtube
          style={{ display: "none" }}
          videoId={videoId}
          opts={playerOpts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>

      <Controller
        nowPlaying={nowPlaying}
        onPlayClick={handlePlayButtonClick}
        onPauseClick={handlePauseButtonClick}
      />
    </>
  );
}

export default App;
