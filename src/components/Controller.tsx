type Props = {
  nowPlaying: boolean
  onPlayClick: () => void
  onPauseClick: () => void
}
export const Controller = ({ nowPlaying, onPlayClick, onPauseClick }: Props) => {
  return (
    <div>
      {nowPlaying
        ? <button onClick={() => onPauseClick()}>정지버튼 ⏸️</button>
        : <button onClick={() => onPlayClick()}>플레이버튼 ▶️</button>
      }
    </div>
  )
}
