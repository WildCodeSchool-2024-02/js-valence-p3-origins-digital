import PropTypes from "prop-types";
import Nav from "./Nav";

export default function Header({ openNavModal, setOpenNavModal }) {
  return (
    <header className="z-40 block shadow-2xl bg-background sm:hidden">
      <Nav openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
    </header>
  );
}

Header.propTypes = {
  openNavModal: PropTypes.bool.isRequired,
  setOpenNavModal: PropTypes.func.isRequired,
};
