import no_chapters from "../assets/no_chapters.png";

type Props = {
  videoId: string;
  className: string;
};
export const NoChapters = ({ videoId, className }: Props) => {
  return (
    <div className={className}>
      <div className=" text-center text-base text-[#8A9397]">
        <p>This video doesn't have a playlist!</p>
        <p>Please leave comment with timestamps to the video.</p>
      </div>
      <div className=" bg-[#1A1B21] py-11 rounded-2xl flex flex-col items-center gap-7">
        <div>
          <p>How to add timestamps</p>
          <img src={no_chapters} className=" mt-4"></img>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          className="text-[#ffffff]"
        >
          <button className=" hover:text-[#ffffff]">
            Leave a comment &gt;
          </button>
        </a>
      </div>
    </div>
  );
};
