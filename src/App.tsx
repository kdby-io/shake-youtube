import "./App.css";
import Youtube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { useVideoInfo } from "./hooks/useVideoInfo";
import { useChapters } from "./hooks/useChapters";
import { useSearchParams } from "./hooks/useSearchParams";
import { useState } from "react";
import { ChapterPlayLists } from "./components/ChapterPlayLists";
import { Controller } from "./components/Controller";
import { Title } from "./components/Title";

const playerOpts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
};

let timer: number;

function App() {
  const videoId = useSearchParams("v") ?? "SWqQQ6Yb-6g";
  const videoForShake = useVideoInfo(videoId);
  const chapters = useChapters(videoForShake?.description ?? "");
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);
  const [playerTime, setPlayerTime] = useState<number | undefined>(-10);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = async () => {
    const newState = await player?.getPlayerState();

    console.log(newState);

    if (newState === Youtube.PlayerState.ENDED) {
      setNowPlaying(false);
      clearInterval(timer);
    } else if (newState === Youtube.PlayerState.PLAYING) {
      setNowPlaying(true);
      timer = setInterval(async () => {
        const time = await player?.getCurrentTime();
        setPlayerTime(time);
        console.log(time);
      }, 200);
    } else if (newState === Youtube.PlayerState.PAUSED) {
      setNowPlaying(false);
      clearInterval(timer);
    } else {
      clearInterval(timer);
    }
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
        playerTime={playerTime}
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
        onStateChange={onPlayerStateChange}
      />
    </>
  );
}

export default App;
