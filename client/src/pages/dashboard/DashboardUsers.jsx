import { useLoaderData } from "react-router-dom";
import UserCard from "../../components/UserCard";

export const loader = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error("Error while getting users");
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default function DashboardUsers() {
  const users = useLoaderData();

  return (
    <div className="page">
      <div className="flex flex-wrap w-full gap-8 h-fit">
        {users
          .filter((user) => !user.is_admin)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
}
