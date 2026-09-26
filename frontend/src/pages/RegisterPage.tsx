import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

const RegisterPage = () => {
  const emailRegex = /^\S+@\S+\.\S+$/;

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      if (!emailRegex.test(form.email)) {
        setError("Invalid email");
        return;
      }

      const data = await registerUser(form);

      login(data.user, data.token);

      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration error");
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
        border-pink-100
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
          Create account
        </h1>

        {error && (
          <p
            className="
            bg-red-50
            text-red-500
            rounded-xl
            p-3
            mb-4
            text-center
          "
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
