import "./App.css";
import Youtube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { useVideoInfo } from "./hooks/useVideoInfo";
import { useChapters } from "./hooks/useChapters";
import { useSearchParams } from "./hooks/useSearchParams";
import { useState, useLayoutEffect } from "react";
import { ChapterPlayLists } from "./components/ChapterPlayLists";
import { Controller } from "./components/Controller";
import { Title } from "./components/Title";

const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
};

function App() {
  const videoId = useSearchParams("v") ?? "SWqQQ6Yb-6g";
  const videoForShake = useVideoInfo(videoId);
  const chapters = useChapters(videoForShake?.description ?? "");
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#0F1015";
  });

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlayerPlay = () => {
    setNowPlaying(true);
  };

  const onPlayerPause = () => {
    setNowPlaying(false);
  };

  const onPlayerEnd = () => {
    setNowPlaying(false);
  };

  const handleChapterClick = (s: number) => {
    player?.seekTo(s, true);
    player?.playVideo();
  };

  const handlePlayButtonClick = () => {
    player?.playVideo();
  };

  const handlePauseButtonClick = () => {
    player?.pauseVideo();
  };

  return (
    <>
      <Title
        title={videoForShake?.title ?? ""}
        thumbnailImage={videoForShake?.thumbnails.maxres.url ?? ""}
      />

      <ChapterPlayLists
        chapters={chapters}
        onClick={handleChapterClick}
      />
      <Controller
        nowPlaying={nowPlaying}
        onPlayClick={handlePlayButtonClick}
        onPauseClick={handlePauseButtonClick}
      />
      <Youtube
        videoId={videoId}
        opts={playerOpts}
        onReady={onPlayerReady}
        onPlay={onPlayerPlay}
        onPause={onPlayerPause}
        onEnd={onPlayerEnd}
      />
    </>
  );
}

export default App;
