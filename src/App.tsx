import "./App.css";
import Youtube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { useVideo } from "./hooks/useVideo";
import { useEffect, useState } from "react";
import { ChapterPlayLists } from "./components/ChapterPlayLists";
import { Title } from "./components/Title";
import { Controller } from "./components/Controller";
import { NoChapters } from "./components/NoChapters";

const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "1280",
};

let timer: NodeJS.Timeout;

function App() {
  const { videoId, title, imageUrl, chapters, isVideoReady } = useVideo();
  const startTimes = chapters.map((chapter) => chapter.start);

  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);
  const [playerTime, setPlayerTime] = useState<number>(-10);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  const currentChapterIndex = chapters.findIndex(
    (chapter) => chapter.start <= playerTime && playerTime <= chapter.end
  );
  const currentChapter = chapters[currentChapterIndex];

  const isChaptersExist: boolean = chapters.length !== 0 ? true : false;

  useEffect(() => {
    (async () => {
      const nextSecond = Math.ceil(playerTime);
      const doneChapter =
        startTimes.includes(nextSecond) &&
        0 < nextSecond - playerTime &&
        nextSecond - playerTime <= 0.2;

      if (doneChapter) {
        const currentIndex = chapters.findIndex(
          (chapter) => chapter.end === Math.ceil(playerTime)
        );
        const isCurrentIndexLast = currentIndex === chapters.length - 1;
        const nextIndex = isCurrentIndexLast ? 0 : currentIndex + 1;
        const nextChapter = chapters[nextIndex];
        player?.seekTo(nextChapter.start, true);
      }
    })();
  }, [playerTime]);

  useEffect(() => {
    muted ? player?.mute() : player?.unMute();
  }, [muted]);

  useEffect(() => {
    player?.setVolume(volume);
  }, [volume]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = async () => {
    const newState = await player?.getPlayerState();

    if (newState === Youtube.PlayerState.ENDED) {
      clearInterval(timer);
      const currentIndex = chapters.findIndex(
        (chapter) => chapter.end === Infinity
      );
      const isCurrentIndexLast = currentIndex === chapters.length - 1;
      const nextIndex = isCurrentIndexLast ? 0 : currentIndex + 1;
      const nextChapter = chapters[nextIndex];
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

  const handleChapterClick = (s: number, isCurrentChapter: boolean) => {
    if (isCurrentChapter) {
      nowPlaying ? pause() : play();
    } else {
      player?.seekTo(s, true);
      play();
    }
  };

  const play = () => player?.playVideo();
  const pause = () => player?.pauseVideo();

  const movePrev = () => {
    const isCurrentIndexFirst = currentChapterIndex === 0;
    const prevIndex = isCurrentIndexFirst
      ? chapters.length - 1
      : currentChapterIndex - 1;
    const prevChapter = chapters[prevIndex];
    player?.seekTo(prevChapter.start, true);
  };

  const moveNext = () => {
    const isCurrentIndexLast = currentChapterIndex === chapters.length - 1;
    const nextIndex = isCurrentIndexLast ? 0 : currentChapterIndex + 1;
    const nextChapter = chapters[nextIndex];
    player?.seekTo(nextChapter.start, true);
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
      nowPlaying ? pause() : play();
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  return (
    <>
      <div className="max-w-screen-sm mx-auto my-0 flex flex-col gap-12 pt-8 px-8 h-screen">
        <Title
          className="flex-shrink-0"
          title={title}
          thumbnailImage={imageUrl}
        />
        {isVideoReady ? (
          isChaptersExist ? (
            <ChapterPlayLists
              className="flex-grow overflow-y-auto mb-40 no-scrollbar"
              chapters={chapters}
              onClick={handleChapterClick}
              currentChapter={currentChapter}
              nowPlayerPlaying={nowPlaying}
            />
          ) : (
            <NoChapters
              className="flex flex-col flex-grow mb-52 gap-5 justify-center"
              videoId={videoId}
            />
          )
        ) : (
          <div>Loading...</div>
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
        onPlay={play}
        onPause={pause}
        onMovePrev={movePrev}
        onMoveNext={moveNext}
        currentChapter={currentChapter}
        setVolume={(volume) => {
          setVolume(volume);
          volume !== 0 && setMuted(false);
          volume == 0 && setMuted(true);
        }}
        volume={volume}
        onMute={() => setMuted(true)}
        onUnmute={() => setMuted(false)}
        muted={muted}
        isVideoReady={isVideoReady}
        isChaptersExist={isChaptersExist}
      />
    </>
  );
}

export default App;
