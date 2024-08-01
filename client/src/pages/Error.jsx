import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import errorImg from "../assets/images/404-cat.svg";

export default function Error() {
  return (
    <div className="flex flex-col justify-between w-screen h-screen">
      <Header />
      <main className="flex flex-col items-center mt-20 grow">
        <img
          className="max-h-[22rem]"
          src={errorImg}
          alt="error illustration"
        />
        <Link className="p-2 mt-4 text-white rounded-lg bg-primary" to="/">
          Go to home page
        </Link>
      </main>
      <Footer />
    </div>
  );
}
