import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status === 204) {
        navigate("/dashboard");
      }
    } catch (err) {
      throw new Error("error while trying to delete user");
    }
  };

  return (
    <div
      className="flex justify-between w-full gap-4 px-4 py-2 shadow-lg rounded-xl h-fit sm:w-fit sm:min-w-[18.75rem] cursor-pointer"
      onClick={() => navigate(`/dashboard/users/${user.id}`)}
      role="presentation"
    >
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full bg-primary"
          src={user.avatar}
          alt="avatar"
        />
        <div className="ml-2">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>Registration date : {new Date(user.created_at).toDateString()}</p>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleDelete}>
          <FontAwesomeIcon
            className="hover:text-primary"
            aria-label="delete"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}
