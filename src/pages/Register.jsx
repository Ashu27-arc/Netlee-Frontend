import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Client-side validation
        if (!form.name || !form.email || !form.password) {
            setError("Please fill in all fields");
            return;
        }
        
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        setLoading(true);
        
        try {
            const { data } = await API.post("/auth/register", form);
            login(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <form className="w-80 space-y-4" onSubmit={submit}>
                <h1 className="text-3xl font-bold">Register</h1>

                {error && (
                    <div className="w-full p-2 bg-red-600 rounded text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    className="w-full p-2 bg-gray-800 rounded"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

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
                    placeholder="Password (min 6 characters)"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                />

                <button 
                    className="w-full bg-red-600 p-2 rounded hover:bg-red-700 disabled:bg-gray-600"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
}