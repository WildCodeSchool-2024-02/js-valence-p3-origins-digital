import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Nav({ setOpenNavModal }) {
  const [title, setTitle] = useState();

  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setTitle("Users");
    } else if (location.pathname === "/dashboard/videos") {
      setTitle("Videos");
    } else if (location.pathname === "/dashboard/addVideo") {
      setTitle("Addvideos");
    }
  }, [location.pathname]);

  return (
    <nav className="flex items-center justify-between h-full p-4">
      <FontAwesomeIcon
        className="text-xl text-white cursor-pointer"
        icon={faBars}
        onClick={() => setOpenNavModal(true)}
      />
      <p className="text-white">{title}</p>
      <img src={auth?.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
    </nav>
  );
}
