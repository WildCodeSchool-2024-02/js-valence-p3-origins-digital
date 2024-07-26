import { formatDistanceToNow } from "date-fns";
import AddComment from "./AddComment";

export default function Comments({ comments, location }) {
  return (
    <div className="flex flex-col w-full">
      <AddComment location={location} />
      <div className="flex flex-col w-full gap-4">
        {comments.map((comment) => (
          <div className="w-full p-4 bg-gray-200 rounded-lg" key={comment.id}>
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
        ))}
      </div>
    </div>
  );
}
