import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";

export default function NavModal({ openNavModal, setOpenNavModal }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuth();
    localStorage.clear();
    setOpenNavModal(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Couldn't log out");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={
        openNavModal
          ? `absolute top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen py-4 text-2xl bg-zinc-900`
          : `hidden`
      }
    >
      <FontAwesomeIcon
        className="absolute text-white cursor-pointer top-5 left-5 hover:text-white/70"
        icon={faXmark}
        onClick={() => setOpenNavModal(false)}
      />
      <ul className="flex flex-col items-center justify-center w-full gap-12 text-white">
        <li>
          <NavLink
            className="hover:text-white/70"
            to="/dashboard"
            onClick={() => setOpenNavModal(false)}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:text-white/70"
            to="/dashboard/videos"
            onClick={() => setOpenNavModal(false)}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:text-white/70"
            to="/dashboard/addVideo"
            onClick={() => setOpenNavModal(false)}
          >
            Add video
          </NavLink>
        </li>
      </ul>
      <button
        className="inline-block mt-8 text-2xl text-white hover:text-white/70"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

NavModal.propTypes = {
  openNavModal: PropTypes.bool.isRequired,
  setOpenNavModal: PropTypes.func.isRequired,
};
