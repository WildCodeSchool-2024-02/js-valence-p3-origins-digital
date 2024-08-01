import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import VideoCard from "../../components/VideoCard";

export const loader = async ({ params }) => {
  try {
    const [userData, favoritesData, commentsData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${params.id}`, {
        credentials: "include",
      }),
      fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${params.id}/favorites`,
        { credentials: "include" }
      ),
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${params.id}/comments`, {
        credentials: "include",
      }),
    ]);

    if (!userData.ok || !favoritesData.ok || !commentsData.ok) {
      throw new Error("Failed to fetch data!");
    }
    const [user, favorites, comments] = await Promise.all([
      userData.json(),
      favoritesData.json(),
      commentsData.json(),
    ]);
    return { user, favorites, comments };
  } catch (error) {
    throw new Error(error);
  }
};

export default function DashboardUser() {
  const { user, favorites, comments } = useLoaderData();

  const revalidator = useRevalidator();

  const handleDeleteComment = async (videoId, commentId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoId}/comments/${commentId}`,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.status !== 204) {
        throw new Error("error while deleting comment");
      }

      toast.success("Comment deleted successfully", {
        position: "bottom-right",
      });
      return revalidator.revalidate();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="page">
      <h1>{user?.username}</h1>
      <article>
        <h2 className="mb-4">Favorites</h2>
        <div className="flex flex-col gap-2 max-h-[15rem] overflow-y-scroll sm:max-h-fit sm:flex-row sm:flex-wrap">
          {favorites?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </article>
      <article>
        <h2 className="mb-4">Comment history</h2>
        <div className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <div
              className="flex flex-col p-4 bg-gray-300 rounded-lg max-h-fit"
              key={comment.id}
            >
              <div>
                <Link
                  className="underline underline-offset-2"
                  to={`/dashboard/videos/${comment.videoId}`}
                >
                  <p className="font-semibold">{comment.title}</p>
                </Link>
                <p className="my-2 text-sm text-gray-600">
                  {new Date(comment.created_at).toDateString()}
                </p>
                <p>{comment.comment}</p>
              </div>
              <div className="self-end">
                <button
                  className="p-0 m-0"
                  aria-label="delete"
                  type="button"
                  onClick={() =>
                    handleDeleteComment(comment.videoId, comment.id)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>
      <ToastContainer />
    </section>
  );
}
