function Title(props: { title: string; thumbnailImage: string }) {
  const { title, thumbnailImage } = props;

  return (
    <>
      <div className="max-w-screen-sm flex gap-x-4">
        <img
          src={thumbnailImage}
          className="w-40 h-22 flex-none object-cover rounded-md"
        ></img>
        <div className="flex items-center">
          <h1 className="text-2xl font-sans font-bold text-left">{title}</h1>
        </div>
      </div>
    </>
  );
}

export default Title;
