import { formatDistanceToNow } from "date-fns";

export default function Comment({ comment }) {
  return (
    <div className="w-full p-4 bg-gray-200 rounded-lg">
      <div className="flex items-center mb-2">
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
      <p>{comment.comment}</p>
    </div>
  );
}
