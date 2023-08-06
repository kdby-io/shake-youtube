// import { useEffect, useState } from "react";
// import { video } from "./services/youtube";
import ChapterPlayLists from "./components/ChapterPlayLists";
import useVideoInfo from "./hooks/useVideoInfo";
import "./App.css";

const useVideoId = () => new URLSearchParams(window.location.search).get("v");

function App() {
  const videoId: string = useVideoId() ?? "SWqQQ6Yb-6g";
  const videoForShake = useVideoInfo(videoId);

  return (
    <>
      <h1>Shake Youtube</h1>
      <p>http://localhost:5173/watch?v={videoId}</p>
      <div className="card">
        <button onClick={() => console.log(videoForShake)}>
          영상정보 콘솔에 출력하기
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <strong>타이틀</strong>
      <p>{videoForShake.title}</p>
      <div style={{ height: "30px" }}></div>
      <ChapterPlayLists
        description={videoForShake.description}
        videoId={videoId}
      />
    </>
  );
}

export default App;
