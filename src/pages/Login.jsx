import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Client-side validation
        if (!form.email || !form.password) {
            setError("Please fill in all fields");
            return;
        }
        
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        setLoading(true);
        
        try {
            const { data } = await API.post("/auth/login", form);
            login(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const google = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <form className="w-80 space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold">Login</h1>

                {error && (
                    <div className="w-full p-2 bg-red-600 rounded text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                />

                <button 
                    className="w-full bg-red-600 p-2 rounded hover:bg-red-700 disabled:bg-gray-600"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    onClick={google}
                    className="w-full bg-blue-600 p-2 rounded"
                >
                    Login with Google
                </button>

                <p className="text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-red-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
}
