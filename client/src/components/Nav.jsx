import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavModal from "./NavModal";
import logo from "../assets/images/origins-digital-logo.png";
import avatar from "../assets/images/avatar.png";

export default function Nav() {
  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { setAuth, auth } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {}, [auth]);

  const handleLogout = () => {
    setAuth();
    localStorage.clear();
  };

  return (
    <>
      <NavModal showModal={showModal} setShowModal={setShowModal} />
      <nav className="relative flex items-center justify-between px-5 py-5 text-white bg-black/80 backdro-blur-sm">
        <img className="w-24" src={logo} alt="origins-digital-logo" />
        <div className="hidden smallScreen:flex smallScreen:items-center smallScreen:gap-12">
          <input
            className="hidden py-2 text-black placeholder:text-black md:block sm:h-fit sm:self-center sm:p-1 sm:px-4 sm:placeholder-white sm:rounded-lg"
            type="text"
            placeholder="Search"
          />
          <ul className="flex items-center gap-5">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
        {auth ? (
          <div className="hidden smallScreen:flex smallScreen:items-center">
            <NavLink className="mr-4 nav-link" to="/profil">
              {auth?.username}
            </NavLink>
            <div
              className="w-8 h-8 overflow-hidden rounded-full cursor-pointer"
              onKeyDown={(e) =>
                e.key === "Enter" ? setShowOptions(true) : null
              }
              onClick={() => setShowOptions(true)}
              role="button"
              tabIndex={0}
            >
              <img className="w-full h-full" src={avatar} alt="profil avatar" />
            </div>
            <div
              className={
                showOptions
                  ? `absolute z-50 right-5 top-20 h-fit w-[5rem] bg-gray-200 rounded-lg py-2`
                  : `hidden`
              }
            >
              <Link
                className="inline-block w-full px-2 text-black hover:text-primary"
                to="/profil"
                onClick={() => setShowOptions(false)}
              >
                Profil
              </Link>
              <button
                type="button"
                className="px-2 py-0 m-0 text-black w-fit hover:text-primary"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden smallScreen:flex smallScreen:items-center">
            <NavLink
              className="mr-4 nav-link"
              to="/login"
              state={{ from: pathname }}
            >
              Login
            </NavLink>
            <NavLink className="mr-4 nav-link" to="/register">
              Register
            </NavLink>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="cursor-pointer smallScreen:hidden"
          onClick={() => setShowModal(true)}
        >
          <path
            fill="currentColor"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          />
        </svg>
      </nav>
    </>
  );
}
