import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />

      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
