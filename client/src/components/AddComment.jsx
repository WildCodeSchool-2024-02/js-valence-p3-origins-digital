import { useState } from "react";
import { useParams, useRevalidator } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AddComment() {
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const { id } = useParams();
  const userId = auth?.id;

  const revalidator = useRevalidator();

  async function handleAddComment(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/comments`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            comment,
            userId,
            id,
          }),
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("error while sending comment");
      } else {
        setComment("");
        revalidator.revalidate();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleAddComment}
      className="flex flex-col w-full gap-4 mb-8 sm:gap-0 sm:flex-row"
    >
      <textarea
        onChange={(e) => setComment(e.target.value)}
        type="text"
        name="text"
        required
        value={comment}
        placeholder="add a comment..."
        className={
          auth
            ? `w-[90%] bg-transparent border-b border-gray-600 rounded-none resize-none`
            : `w-[90%] bg-transparent border-b border-gray-600 rounded-none resize-none cursor-not-allowed`
        }
        disabled={!auth}
      />
      <button
        className={
          auth
            ? `inline-block sm:block self-start sm:self-end p-1 px-4 m-0 sm:ml-2 text-white h-fit bg-primary w-fit sm:w-[10%]`
            : `inline-block sm:block self-start sm:self-end p-1 px-4 m-0 sm:ml-2 text-white h-fit bg-gray-400 w-fit sm:w-[10%]`
        }
        type="submit"
        disabled={!auth}
      >
        Send
      </button>
    </form>
  );
}
