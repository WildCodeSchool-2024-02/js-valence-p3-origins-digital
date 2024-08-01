import { useLoaderData } from "react-router-dom";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import AddToFavorite from "../components/AddToFavorite";
import { useAuth } from "../hooks/useAuth";
import Comments from "../components/Comments";
import AddRates from "../components/AddRates";

export const loader = async ({ params }) => {
  try {
    const [avgData, commentsData, videoData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}/avgrate`, {
        credentials: "include",
      }),
      fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${params.id}/comments`,
        { credentials: "include" }
      ),
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}`, {
        credentials: "include",
      }),
    ]);
    if (!avgData.ok || !commentsData.ok || !videoData.ok) {
      throw new Error("Failed to fetch data!");
    }
    const [avg, comments, video] = await Promise.all([
      avgData.json(),
      commentsData.json(),
      videoData.json(),
    ]);
    return { avg, comments, video };
  } catch (error) {
    console.error("Error loading data: ", error);
    throw error;
  }
};

export default function Video() {
  const { auth } = useAuth();

  const { avg, comments, video } = useLoaderData();
  const avgData = Object.values(avg);

  const diffDate = formatDistanceToNow(new Date(video.created_at), {
    addSuffix: true,
  });

  return (
    <section className="page">
      <h1 className="mb-4 sm:mb-8">{video.title}</h1>
      {video.isPrivate && !auth ? (
        <div
          className="w-full flex items-center justify-center bg-black/70 mb-2 rounded-lg min-h-[200px]  sm:min-h-[400px] overflow-hidden sm:mb-4 relative after:absolute after:content-[' '] after:bg-black/70 after:top-0 after:left-0 after:h-full after:w-full"
          style={{ background: `url('${video?.thumbnail}') center/cover` }}
        >
          <FontAwesomeIcon
            className="z-30 text-xl text-white sm:text-4xl"
            icon={faLock}
          />
        </div>
      ) : (
        <div className="w-full mb-2 rounded-lg verflow-hidden">
          <video className="min-w-full max-h-[25rem] rounded-lg" controls>
            <track kind={video.description} />
            <source src={video.source} />
          </video>
        </div>
      )}
      {video.isPrivate && !auth ? (
        <section className="flex items-center pb-4 border-b border-gray-300">
          <FontAwesomeIcon
            className="text-xl text-gray-400 sm:text-2xl"
            icon={faLock}
          />
          <h2 className="ml-4 text-sm text-gray-400 md:text-base">
            Content is Private log in to see all the videos and be able to
            comment
          </h2>
        </section>
      ) : null}

      {auth ? (
        <div className="flex items-center justify-between">
          <AddRates stars={5} />
          <AddToFavorite videoId={video.id} />
        </div>
      ) : null}
      <section className="flex flex-col p-4 mb-2 bg-gray-200 rounded-lg sm:mb-4 md:mb-6">
        <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
        <p className="text-sm sm:text-base">{video.description}</p>
        <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-sm">
          {diffDate}
        </p>
        <p className="text-xs font-semibold sm:text-sm">
          Average User Rating : {avgData}
        </p>
      </section>
      <Comments comments={comments} />
      <ToastContainer />
    </section>
  );
}
