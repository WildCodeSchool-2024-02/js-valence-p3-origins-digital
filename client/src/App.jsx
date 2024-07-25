import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-between min-h-screen sm:block">
      <Header />
      <main
        className={
          pathname === "/"
            ? `min-h-full sm:block`
            : `flex grow min-h-full sm:block`
        }
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
