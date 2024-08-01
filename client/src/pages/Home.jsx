import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Carousel from "../components/Carousel";
import BannerCarousel from "../components/BannerCarousel";

export const loader = async () => {
  try {
    const [videosData, videosByCategoryData, bestVideosData, categoriesData] =
      await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/videos/all`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/videos`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/videos/best`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
          credentials: "include",
        }),
      ]);
    if (
      !videosData.ok ||
      !videosByCategoryData.ok ||
      !bestVideosData.ok ||
      !categoriesData.ok
    ) {
      throw new Error("Error while fetching dashboard video data");
    }
    const [videos, videoByCategory, bestVideos, categories] = await Promise.all(
      [
        videosData.json(),
        videosByCategoryData.json(),
        bestVideosData.json(),
        categoriesData.json(),
      ]
    );
    return { videos, videoByCategory, bestVideos, categories };
  } catch (error) {
    throw new Error(error);
  }
};

export default function Home() {
  const [filteredVideos, setFilteredVideos] = useState();
  const { videos, videoByCategory, bestVideos, categories } = useLoaderData();
  const lastAddedVideos = videos.slice(0, 5);

  const categoryRef = useRef();

  const handleCategory = () => {
    if (categoryRef.current?.value) {
      setFilteredVideos(
        videoByCategory.filter(
          (video) => video.name === categoryRef.current?.value
        )
      );
    } else {
      setFilteredVideos();
    }
  };

  return (
    <div className="relative px-6 py-6 bg-zinc-900 sm:py-8">
      <BannerCarousel videos={bestVideos} />
      <section className="w-full mb-8 sm:mb-12">
        <h2 className="mb-4 text-xl text-white sm:mb-6">Last added videos</h2>
        <Carousel videos={lastAddedVideos} autoplaying />
      </section>
      <section className="w-full">
        <select
          className="p-1 mb-4 border-2 border-gray-200 rounded-lg h-fit w-fit"
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
        <h2 className="mb-4 text-xl text-white sm:mb-6">
          {categoryRef.current?.value
            ? categoryRef.current?.value
            : "All videos"}
        </h2>
        {filteredVideos ? (
          <Carousel videos={filteredVideos} autoplaying={false} />
        ) : (
          <Carousel videos={videos} autoplaying={false} />
        )}
      </section>
    </div>
  );
}
