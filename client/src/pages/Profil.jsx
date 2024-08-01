import { useLoaderData, useRevalidator, Link } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import { formatDistanceToNow } from "date-fns";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilVideoBanner from "../components/ProfilVideoBanner";

export const loader = async () => {
  try {
    const { id } = JSON.parse(localStorage.getItem("username"));
    const [videosData, commentsData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}/favorites`, {
        credentials: "include",
      }),
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}/comments`, {
        credentials: "include",
      }),
    ]);
    if (!videosData.ok || !commentsData.ok) {
      throw new Error("Failed to fetch data!");
    }
    const [videos, comments] = await Promise.all([
      videosData.json(),
      commentsData.json(),
    ]);
    return { videos, comments, id };
  } catch (error) {
    console.error("Error loading data: ", error);
    throw error;
  }
};

export default function Profil() {
  const { videos, comments, id } = useLoaderData();
  const [videoIndex, setVideoIndex] = useState(0);

  const handleClick = (selectedVideo) => {
    setVideoIndex(selectedVideo);
  };
  const currentVideo = videos[videoIndex];

  const renderVideos = videos.map((video, index) => (
    <div key={video.id}>
      <img
        role="presentation"
        onClick={() => {
          handleClick(index);
        }}
        className="object-cover h-40 border rounded cursor-pointer w-80 "
        src={video.thumbnail}
        alt=" "
      />
    </div>
  ));

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const revalidator = useRevalidator();

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status !== 204) {
        throw new Error("A problem occurred while loading the videos.");
      } else {
        revalidator.revalidate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between w-full h-full">
      <div className="flex items-center justify-start w-full h-14 bg-primary">
        <h1 className="pl-4 text-white"> My Favorites </h1>
      </div>
      <div className="flex items-center justify-center w-full h-full overflow-x-hidden">
        {videos.length !== 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {videos.length >= 4 ? (
              <div className="flex flex-row items-center justify-center w-full gap-2">
                <Slider
                  className="flex justify-center gap-6 lg:w-2/3  sm:mr-2.5 sm:ml-2.5 items-center mt-5 sm:flex-row w-2/3"
                  slidesToShow={settings.slidesToShow}
                  slidesToScroll={settings.slidesToScroll}
                  responsive={settings.responsive}
                >
                  {renderVideos}
                </Slider>
              </div>
            ) : (
              <div className="flex justify-center gap-6 lg:w-2/3 sm-mr-2.5 sm:ml-2.5 flex-wrap items-center mt-5 sm:flex-row">
                {renderVideos}
              </div>
            )}
            <div className="mt-5 mb-5 lg:w-full xl:w-1/2 sm:w-full md:w-full">
              <ProfilVideoBanner
                title={currentVideo.title}
                source={currentVideo.source}
                description={currentVideo.description}
                videoId={currentVideo.videoId}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-center mt-5 grow min-h-80">
            <p className="text-center text-white">
              You don't have any favorite video to show
            </p>
          </div>
        )}
      </div>
      <div className="w-full mb-5 min-h-80">
        <div className="flex items-center w-full mb-5 h-14 bg-primary">
          <h1 className="px-6 text-white"> My Comments </h1>
        </div>
        {comments.length !== 0 ? (
          <div className="flex flex-col justify-center w-full gap-3 px-4 sm:flex-row sm:flex-wrap ">
            {comments.map((comment) => (
              <div
                className="w-full p-4 bg-gray-200 rounded-lg h-30 lg:w-1/3"
                key={comment.id}
              >
                <div className="flex items-center ">
                  <img
                    className="w-6 h-6 mr-2 rounded-full bg-primary"
                    src={comment.avatar}
                    alt=""
                  />
                  <p>{comment.username}</p>
                  <p className="self-center ml-2 text-xs">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <Link to={`/videos/${comment.videoId}`}>
                    <h3 className="underline font-xs text-primary ">
                      {comment.title}
                    </h3>
                  </Link>
                  <button
                    type="button"
                    className="mt-0"
                    aria-label="delete"
                    onClick={() => {
                      handleDelete(comment.id);
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-base rounded-full cursor-pointer text-primary sm:text-xl hover:text-orange-600"
                      icon={faTrash}
                    />
                  </button>
                </div>

                <p className="text-xs lg:text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center text-white">
              You don't have any comment to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
