import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <Header />
      <main>
        <h1>An error occured</h1>
        <h2>{error.message}</h2>
      </main>
      <Footer />
    </>
  );
}
