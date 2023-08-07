import ChapterPlayLists from "./components/ChapterPlayLists";
import useVideoInfo from "./hooks/useVideoInfo";
import useChapters from "./hooks/useChapters";
import Youtube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import "./App.css";
import { useState } from "react";
import Controller from "./components/Controller";

const useVideoId = () => new URLSearchParams(window.location.search).get("v");
const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
};

function App() {
  const videoId: string = useVideoId() ?? "SWqQQ6Yb-6g";
  const videoForShake = useVideoInfo(videoId);
  const chapters = useChapters(videoForShake.description);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlayerPlay = () => {
    setNowPlaying(true);
  };

  const onPlayerPause = () => {
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
      <h1>Shake Youtube</h1>
      <p>http://localhost:5173/watch?v={videoId}</p>
      <Youtube
        videoId={videoId}
        opts={playerOpts}
        onReady={onPlayerReady}
        onPlay={onPlayerPlay}
        onPause={onPlayerPause}
      />
      <Controller
        nowPlaying={nowPlaying}
        onPlayClick={handlePlayButtonClick}
        onPauseClick={handlePauseButtonClick}
      />
      <ChapterPlayLists
        chapters={chapters}
        videoId={videoId}
        onClick={handleChapterClick}
      />
    </>
  );
}

export default App;
