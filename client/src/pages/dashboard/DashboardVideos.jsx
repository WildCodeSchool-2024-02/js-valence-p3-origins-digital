import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import VideoCard from "../../components/VideoCard";

export const loader = async () => {
  try {
    const [videosData, videosByCategoryData, categoriesData] =
      await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/videos/all`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/videos`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
          credentials: "include",
        }),
      ]);
    if (!videosData.ok || !videosByCategoryData.ok || !categoriesData.ok) {
      throw new Error("Error while fetching dashboard video data");
    }

    const [videos, videosByCategory, categories] = await Promise.all([
      videosData.json(),
      videosByCategoryData.json(),
      categoriesData.json(),
    ]);
    return { videos, videosByCategory, categories };
  } catch (error) {
    throw new Error(error);
  }
};

export default function DashboardVideos() {
  const [filteredVideos, setFilteredVideos] = useState();
  const { videos, videosByCategory, categories } = useLoaderData();
  const categoryRef = useRef();

  const handleCategory = () => {
    if (categoryRef.current?.value) {
      setFilteredVideos(
        videosByCategory.filter(
          (video) => video.name === categoryRef.current?.value
        )
      );
    } else {
      setFilteredVideos();
    }
  };

  return (
    <div className="page">
      <select
        className="p-2 border-2 border-gray-200 rounded-lg h-fit w-fit"
        name="filter"
        ref={categoryRef}
        onChange={handleCategory}
      >
        <option value="">category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap w-full gap-4 h-fit">
        {filteredVideos
          ? filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          : videos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
}
