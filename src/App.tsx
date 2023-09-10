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
import { NoChapters } from "./components/NoChapters";

const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "1280",
};

let timer: NodeJS.Timeout;

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

  const isChaptersExist: boolean = chapters.length !== 0 ? true : false;

  useEffect(() => {
    (async () => {
      const nextSecond = Math.ceil(playerTime);
      const doneChapter =
        startTimes.includes(nextSecond) &&
        0 < nextSecond - playerTime &&
        nextSecond - playerTime <= 0.2;

      if (doneChapter) {
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
      }, 100);
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

  const handleControllerButtonClick = (s: number) => {
    if (nowPlaying) {
      player?.seekTo(s, true);
    } else if (!nowPlaying) {
      player?.seekTo(s, true);
      player?.playVideo();
    }
  };

  const handleControllerVolume = (volume: number) => {
    player?.setVolume(volume);
  };

  const handleKeyPress: (event: KeyboardEvent) => void = (
    event: KeyboardEvent
  ) => {
    if (
      event.key === " " ||
      event.keyCode === 32 ||
      event.code === "Space" ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      if (nowPlaying) {
        player?.pauseVideo();
      } else if (!nowPlaying) {
        player?.playVideo();
      }
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  return (
    <>
      <div className="max-w-screen-sm mx-auto my-0 flex flex-col gap-12 pt-8 px-8 h-screen">
        <Title
          className="flex-shrink-0"
          title={videoForShake?.title ?? ""}
          thumbnailImage={
            videoForShake?.thumbnails.maxres
              ? videoForShake?.thumbnails.maxres.url ?? ""
              : videoForShake?.thumbnails.medium.url ?? ""
          }
        />
        {isChaptersExist ? (
          <ChapterPlayLists
            className="flex-grow overflow-y-auto mb-40 no-scrollbar"
            chapters={shakedChapters}
            onClick={handleChapterClick}
            playerTime={playerTime}
            nowPlayerPlaying={nowPlaying}
          />
        ) : (
          <NoChapters
            className="flex flex-col flex-grow mb-52 gap-5 justify-center"
            videoId={videoId}
          />
        )}

        <Youtube
          className="hidden"
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
        chapters={shakedChapters}
        playerTime={playerTime}
        seekTo={handleControllerButtonClick}
        setVolume={handleControllerVolume}
      />
    </>
  );
}

export default App;
