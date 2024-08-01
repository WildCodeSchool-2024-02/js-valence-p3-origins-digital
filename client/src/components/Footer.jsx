import logo from "../assets/images/origins-digital-logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-between w-full px-4 py-4 text-white bg-black">
      <img className="h-[25px]" src={logo} alt="origins_digital" />
      <p className="text-sm">© Origins Digital 2024</p>
    </footer>
  );
}
