import AddComment from "./AddComment";
import Comment from "./Comment";

export default function Comments({ comments }) {
  return (
    <div className="flex flex-col w-full">
      <AddComment />
      <div className="flex flex-col w-full gap-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
