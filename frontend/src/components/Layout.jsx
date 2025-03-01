import { Outlet } from "react-router-dom";
import Logout from "../features/auth/Logout";

const Layout = () => {
  return (
    <main className="w-screen h-screen grid grid-rows-[auto_1fr] font-roboto bg-[#fafbfc]">
      <header className="border-b border-gray-100 bg-white shadow-xs">
        <nav className="flex flex-row items-center justify-center container mx-auto w-5xl p-2">
          <div className="grow p-2">
            <img src="/images/iskript.png" alt="" className="w-[100px]" />
          </div>
          <Logout />
        </nav>
      </header>
      <div className="container mx-auto w-5xl p-2">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
