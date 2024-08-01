import { useState, useRef, useEffect } from "react";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/origins-digital-logo.png";
import avatar from "../assets/images/avatar.png";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        isAdmin: false,
        avatar,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || "Unknown error while trying to register"
      );
    }
    return redirect("/login");
  } catch (err) {
    throw new Error(err.message);
  }
}

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const error = useRouteError();

  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("Please fill in all fields in accordance with the instructions");
  }, [user, email, pwd, matchPwd]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-black lg:flex-row">
      <Link
        className="absolute hidden text-primary top-4 left-10 lg:flex lg:items-center"
        to="/"
      >
        <FontAwesomeIcon
          className="h-6 mr-4 cursor-pointer text-primary"
          icon={faArrowLeft}
        />{" "}
      </Link>
      <Link to="/">
        <img
          src={logo}
          className="block h-auto mt-4 lg:hidden w-36 smallScreen:w-44"
          alt="origin digital logo"
        />
      </Link>
      <section className="h-full w-full md:mt-4 lg:w-[45%] min-h-[400px] flex flex-col justify-center items-center p-4 px-8 md:px-16 lg:pl-16 bg-black">
        {error && (
          <p className="max-w-[95%] mb-2 text-red-500 flex gap-2">
            <FontAwesomeIcon
              className="pt-1 text-red-400"
              icon={faTriangleExclamation}
            />
            {error.message}
          </p>
        )}
        <p
          ref={errRef}
          className={
            user &&
            (!validName || !validEmail || !validPwd || (!validMatch && errMsg))
              ? "errmsg"
              : "hide"
          }
        >
          {errMsg}
        </p>
        <Form
          method="post"
          className="flex flex-col w-full max-w-[650px] pb-4 max-h-[800px]"
        >
          <div>
            <label htmlFor="username">
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="text"
              id="username"
              name="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                userFocus && user && !validName ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid email address
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && !validPwd ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters: <span>! @ # $ %</span>
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm_pwd">
              Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="password"
              name="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p className={matchFocus && !validMatch ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field
            </p>
          </div>
          <button
            type="submit"
            disabled={
              !validName ||
              !validEmail ||
              !validPwd ||
              !validMatch ||
              isSubmiting
            }
            className={isSubmiting ? `button bg-gray-300` : `button bg-primary`}
          >
            {isSubmiting ? "Registering in..." : "Register"}
          </button>
        </Form>
        <p className="text-white">
          Already have an accout ?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </p>
      </section>
      <div className="img-container" />
    </main>
  );
}

export default Register;
