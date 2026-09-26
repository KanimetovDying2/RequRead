import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-purple-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition"
        >
          RequRead
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium">
          {user ? (
            <>
              <Link
                to={`/users/${user._id}`}
                className="text-gray-700 hover:text-purple-600 transition"
              >
                {user.username}
              </Link>

              <Link
                to="/create-recipe"
                className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow"
              >
                Create recipe
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-600 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
