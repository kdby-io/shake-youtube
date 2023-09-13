type Props = {
  title: string;
  thumbnailImage: string;
  className?: string;
};
export const Title = ({ title, thumbnailImage, className }: Props) => {
  return (
    <div className={className}>
      <div className="flex gap-x-4">
        <img
          src={thumbnailImage}
          className="w-40 h-22 flex-none object-cover rounded-md"
        />
        <div className="flex items-center">
          <h1 className="text-2xl font-sans font-bold text-left overflow-hidden text-ellipsis	title-text">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};
