import no_chapters from "../assets/no_chapters.png";

type Props = {
  videoId: string;
  className: string;
};
export const NoChapters = ({ videoId, className }: Props) => {
  return (
    <div className={className}>
      <div className=" text-center text-base text-[#8A9397]">
        <p>해당 플레이리스트에 타임라인이 없어요!</p>
        <p>댓글에 타임라인을 달아주세요.</p>
      </div>
      <div className=" bg-[#1A1B21] py-11 rounded-2xl flex flex-col items-center gap-7">
        <div>
          <p>타임라인 추가 방법</p>
          <img src={no_chapters} className=" mt-4"></img>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          className="text-[#ffffff]"
        >
          <button className=" hover:text-[#ffffff]">타임라인 추가하기</button>
        </a>
      </div>
    </div>
  );
};
