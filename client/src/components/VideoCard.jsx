import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/dashboard/videos/${video.id}`, { state: video });
    }
  };

  return (
    <div
      className="relative shadow-lg rounded-xl h-[10rem] min-h-[10rem] w-full sm:w-[16rem] overflow-hidden cursor-pointer"
      onClick={() =>
        navigate(`/dashboard/videos/${video.id}`, { state: video })
      }
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <p className="absolute z-20 text-xs font-semibold text-white sm:text-md md:text-base bottom-2 left-2 sm:bottom-4 sm:left-4">
        {video.title}
      </p>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black" />
      <img
        className="object-cover w-full h-full"
        src={video.thumbnail}
        alt={`${video.title} thumbnail`}
      />
    </div>
  );
}
