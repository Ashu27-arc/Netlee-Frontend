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
        <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md lg:max-w-lg px-4 sm:px-6">
                <form className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-5 sm:space-y-6 shadow-2xl" onSubmit={submit}>
                    <div className="text-center mb-4 sm:mb-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2">STREAMNOVA</h1>
                        <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Create your account</p>
                    </div>

                    {error && (
                        <div className="w-full p-2.5 sm:p-3 bg-red-600/20 border border-red-600 rounded-lg text-xs sm:text-sm text-red-400 flex items-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                        <div>
                            <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5 sm:mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm sm:text-base lg:text-lg"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5 sm:mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm sm:text-base lg:text-lg"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5 sm:mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm sm:text-base lg:text-lg"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                minLength={6}
                            />
                            <p className="text-xs lg:text-sm text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-red-600 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold hover:bg-red-700 active:scale-98 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-red-600/50 text-sm sm:text-base lg:text-lg"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : "Create Account"}
                    </button>

                    <p className="text-center text-gray-400 text-xs sm:text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-red-600 hover:text-red-500 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}