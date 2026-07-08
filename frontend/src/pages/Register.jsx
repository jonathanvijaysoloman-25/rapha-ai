import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    const {  error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) throw error;

    alert("Hurray !! Registration successful");

    navigate("/login");

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
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-600"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-center mt-5 text-gray-400 cursor-pointer hover:text-white"
        >
          Already have an account?
          <span className="text-red-500"> Login</span>
        </p>

      </div>
    </div>
  );
}