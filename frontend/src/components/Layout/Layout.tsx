import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>Header</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
