import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    setLoading(true);

    const {  error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    alert("Login Successful!");

    navigate("/", { replace: true });

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-96 bg-[#111] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold text-center mb-6">
          Rapha AI Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/register")}
          className="text-center mt-5 text-gray-400 cursor-pointer hover:text-white"
        >
          Don't have an account?
          <span className="text-red-500"> Register Now</span>
        </p>

      </div>
    </div>
  );
}