import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/origins-digital-logo.png";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
  const userRef = useRef();

  const errRef = useRef();

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
    <main className="flex flex-col relative items-center justify-center lg:flex-row h-screen bg-black">
      <Link
        className="hidden text-primary absolute top-4 left-10 lg:flex lg:items-center"
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
          className="block lg:hidden h-auto  w-36 smallScreen:w-44 mt-4"
          alt="origin digital logo"
        />
      </Link>
      <section className="h-full w-full md:mt-4 lg:w-[45%] min-h-[400px] flex flex-col justify-center items-center p-4 px-8 md:px-16 lg:pl-16 bg-black">
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
        <form className="flex flex-col w-full max-w-[650px] pb-4 max-h-[800px]">
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
            type="button"
            disabled={!validName || !validEmail || !validPwd || !validMatch}
          >
            Sign Up
          </button>
        </form>
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
