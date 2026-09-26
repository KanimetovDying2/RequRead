import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      const data = await loginUser(form);

      login(data.user, data.token);

      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="flex justify-center px-5 py-16">
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        border
        border-purple-100
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-8
          text-purple-700
        "
        >
          Login
        </h1>

        {error && (
          <p
            className="
            mb-4
            rounded-xl
            bg-red-50
            text-red-500
            p-3
            text-center
          "
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Email"
            className="
              rounded-xl
              border
              border-gray-200
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
              rounded-xl
              border
              border-gray-200
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            className="
              mt-3
              rounded-xl
              bg-purple-600
              text-white
              py-3
              hover:bg-purple-700
              transition
              shadow
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
