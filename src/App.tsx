import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { video } from "./services/youtube";
import "./App.css";

const useVideoId = () => new URLSearchParams(window.location.search).get("v");

function App() {
  // const [count, setCount] = useState(0);
  const videoId: string = useVideoId() ?? "SWqQQ6Yb-6g";
  const [videoForShake, setvideoForShake] = useState<any>(null);

  const getVideoInfo = async () => {
    setvideoForShake(await video(videoId));
  };

  useEffect(() => {
    getVideoInfo();
  }, [videoId]);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Shake Youtube</h1>
      <p>http://localhost:5173/watch?v={videoId}</p>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
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
      {videoForShake && <p>{videoForShake.title}</p>}
      <div style={{ height: "30px" }}></div>
      <strong>설명</strong>
      {videoForShake && <pre>{videoForShake.description}</pre>}
    </>
  );
}

export default App;
