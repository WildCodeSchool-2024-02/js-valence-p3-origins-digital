import { useEffect, useRef } from "react";
import { useRevalidator, Link } from "react-router-dom";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks/useAuth";

function ProfilVideoBanner({ title, source, videoId }) {
  const auth = useAuth();
  const userId = auth.auth.id;
  const revalidator = useRevalidator();

  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [source]);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/favorites/${videoId}`,
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
    <div className="flex flex-col">
      <video
        className="relative w-full xl:h-[500px] max-h-[500px]"
        ref={videoRef}
        controls
      >
        <source src={source} />
      </video>
      <div className="absolute p-4">
        <Link to={`/videos/${videoId}`}>
          <h2 className="text-xs underline text-white/70 hover:text-white md:text-2xl">
            {title}
          </h2>
        </Link>
        <button
          type="button"
          className="mt-0"
          aria-label="delete"
          onClick={handleDelete}
        >
          <FontAwesomeIcon
            className="p-2 text-base text-white rounded-full cursor-pointer sm:text-3xl hover:text-primary hover:bg-white"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}

export default ProfilVideoBanner;
