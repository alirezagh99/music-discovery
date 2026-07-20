export const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
      <div className="col-span-1">
        <h1 className="text-3xl text-center lg:text-start lg:text-6xl flex flex-col gap-6">
          <span>Discover Music Around You</span>
          <span>Instantly identify any song in seconds.</span>
        </h1>
      </div>
      <div className="col-span-1 bg-gray-500 h-full">animation</div>
    </div>
  );
};
