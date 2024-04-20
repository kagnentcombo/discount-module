import Navbar from "./layout/Navbar";

export default function Layout({ children, themeColor, bgColor }) {
  return (
    <>
      <Navbar themeColor={themeColor} bgColor={bgColor} />
      <main>{children}</main>
    </>
  );
}
