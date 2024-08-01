import { useEffect, useRef } from "react";
import {
  Link,
  Form,
  useNavigate,
  useActionData,
  useNavigation,
  useRouteError,
  useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/origins-digital-logo.png";
import { useAuth } from "../hooks/useAuth";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 422) {
      throw new Error(data?.message || "Uknown error while trying to log in.");
    }
    const userData = {
      id: data?.user?.id,
      username: data?.user?.username,
      isAdmin: data?.user?.is_admin,
      avatar: data?.user?.avatar,
    };
    localStorage.setItem("username", JSON.stringify(userData));
    return userData;
  } catch (err) {
    throw new Error(err?.message);
  }
}

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const actionData = useActionData();
  const error = useRouteError();
  const emailRef = useRef();
  const navigation = useNavigation();
  const { search } = useLocation();
  const redirectTo = search ? search.slice(12) : "/";
  const isSbumitting = navigation.state === "submitting";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
      if (!actionData.isAdmin) {
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [actionData, setAuth, navigate]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-black lg:flex-row">
      <Link to="/" className="mt-16">
        <img
          src={logo}
          className="block h-auto mt-4 lg:hidden w-36 smallScreen:w-44"
          alt="origin digital logo"
        />
      </Link>
      <section className="h-full w-full md:mt-4 lg:w-[45%] min-h-[400px] flex flex-col justify-center items-center p-4 px-8 md:px-16 lg:pl-16 bg-black">
        {error && (
          <p className="max-w-[95%] mb-2 text-red-400 flex gap-2">
            <FontAwesomeIcon
              className="pt-1 text-red-400"
              icon={faTriangleExclamation}
            />
            {error.message}
          </p>
        )}
        <Form
          method="POST"
          className="flex flex-col w-full max-w-[650px] pb-4 max-h-[800px]"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="formInput"
              name="email"
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="formInput"
              name="password"
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            className={
              isSbumitting ? `button bg-gray-300` : `button bg-primary`
            }
            disabled={isSbumitting}
          >
            {isSbumitting ? "Logging in..." : "Login"}
          </button>
        </Form>
        <p className="text-white">
          Don't you have an accout ?{" "}
          <Link className="text-primary" to="/register">
            Register
          </Link>
        </p>
      </section>
      <div className="img-container">
        <div className="absolute right-[260px] top-[100px] w-[200px]">
          <img src={logo} alt="origin digital logo" />
          <span className="inline-block mt-8 text-4xl font-bold text-primary">
            Ready <br />
            To Watch
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;
