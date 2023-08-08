type Props = {
  title: string
  thumbnailImage: string
}
export const Title = ({ title, thumbnailImage }: Props) => {
  return (
    <div className="max-w-screen-sm flex gap-x-4">
      <img
        src={thumbnailImage}
        className="w-40 h-22 flex-none object-cover rounded-md"
      />
      <div className="flex items-center">
        <h1 className="text-2xl font-sans font-bold text-left">{title}</h1>
      </div>
    </div>
  );
}
