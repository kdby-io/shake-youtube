function Controller(props: {
  nowPlaying: boolean;
  onPlayClick: any;
  onPauseClick: any;
}) {
  const { nowPlaying, onPlayClick, onPauseClick } = props;

  return (
    <>
      {nowPlaying && (
        <button onClick={() => onPauseClick()}>정지버튼 ⏸️</button>
      )}
      {!nowPlaying && (
        <button onClick={() => onPlayClick()}>플레이버튼 ▶️</button>
      )}
    </>
  );
}

export default Controller;
