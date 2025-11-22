import { useState } from "react";
import { API } from "../utils/axios";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("Please enter a search query");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const res = await API.get(`/movies/search?q=${encodeURIComponent(query.trim())}`);
            setResults(res.data || []);
            if (res.data && res.data.length === 0) {
                setError(`No results found for "${query}"`);
            }
        } catch (err) {
            console.error("Search error:", err);
            setError(err.response?.data?.message || "Search failed. Please try again.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12">
                <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-center">
                        🔍 Search Movies
                    </h1>
                    <p className="text-gray-400 text-center text-sm sm:text-base md:text-lg">
                        Discover thousands of movies from TMDB
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for movies, actors, directors..."
                            className="w-full px-6 py-4 sm:py-5 pr-32 rounded-2xl bg-gray-900/80 backdrop-blur-sm text-white border-2 border-gray-800 focus:outline-none focus:border-red-600 text-base sm:text-lg placeholder-gray-500 shadow-2xl"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 sm:px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-600/50 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden sm:inline">Search</span>
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
                        <p className="text-white text-xl font-semibold">Searching...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="max-w-2xl mx-auto bg-red-600/20 border-2 border-red-600/50 rounded-2xl p-6 text-center backdrop-blur-sm">
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-400 text-lg font-semibold">{error}</p>
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className="fade-in">
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <span className="w-1.5 h-10 bg-red-600 rounded-full"></span>
                            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                                Results <span className="text-red-600">({results.length})</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                            {results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} local={false} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && !query && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <svg className="w-24 h-24 text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-gray-400 text-xl mb-2">Start searching for movies</p>
                        <p className="text-gray-600 text-sm">Enter a movie name above to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}
