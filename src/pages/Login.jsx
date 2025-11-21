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
        <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md lg:max-w-lg px-4 sm:px-6">
                <form className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-5 sm:space-y-6 shadow-2xl" onSubmit={handleSubmit}>
                    <div className="text-center mb-4 sm:mb-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2">STREAMNOVA</h1>
                        <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Sign in to continue</p>
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
                                Signing in...
                            </span>
                        ) : "Sign In"}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={google}
                        className="w-full bg-white text-gray-900 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 active:scale-98 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base lg:text-lg"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="text-center text-gray-400 text-xs sm:text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-red-600 hover:text-red-500 font-semibold transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
