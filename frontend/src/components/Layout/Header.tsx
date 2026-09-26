import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link to="/">RequRead</Link>

      <nav className="flex gap-4">
        {user ? (
          <>
            <Link to={`/users/${user._id}`}>{user.username}</Link>
            <Link to="/create-recipe">Create recipe</Link>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
