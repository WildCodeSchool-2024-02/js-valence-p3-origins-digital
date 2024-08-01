import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  faArrowUpFromBracket,
  faRightFromBracket,
  faTv,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/dashboard/Header";
import NavModal from "../../components/dashboard/NavModal";
import logo from "../../assets/images/origins-digital-logo.png";

export default function Dashboard() {
  const [openNavModal, setOpenNavModal] = useState(false);

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
    <>
      <NavModal openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <Header openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <main className="flex h-screen sm:pb-0">
        <aside className="hidden sm:w-[15%] sm:py-6 sm:px-4 sm:flex sm:flex-col sm:justify-between sm:h-full sm:bg-background">
          <div className="flex flex-col items-start justify-center">
            <div className="mb-16 ">
              <img className="w-auto h-16" src={logo} alt="log" />
            </div>
            <ul className="flex flex-col justify-center gap-8 text-sm font-semibold text-white">
              <li>
                <NavLink className="hover:text-white/70" to="/dashboard">
                  <FontAwesomeIcon className="mr-4 text-xl" icon={faUser} />
                  <span className="hidden md:inline">Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-white/70" to="/dashboard/videos">
                  <FontAwesomeIcon className="mr-4 text-xl" icon={faTv} />
                  <span className="hidden md:inline">Videos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-white/70"
                  to="/dashboard/addVideo"
                >
                  <FontAwesomeIcon
                    className="mr-4 text-xl"
                    icon={faArrowUpFromBracket}
                  />
                  <span className="hidden md:inline">Add video</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="p-0 text-base text-white hover:text-white/70 text-start"
            type="button"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              className="mr-4 text-xl"
              icon={faRightFromBracket}
            />
            Log out
          </button>
        </aside>
        <div className="sm:overflow-y-scroll w-full sm:w-[85%]">
          <Outlet />
        </div>
      </main>
    </>
  );
}
