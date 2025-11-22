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

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10">Search Movies</h1>

                <form onSubmit={handleSearch} className="mb-6 sm:mb-8 lg:mb-10 max-w-xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for movies..."
                            className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600 text-sm"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-sm whitespace-nowrap"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="text-white text-center text-lg sm:text-xl py-8">
                        <div className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 text-red-400 text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <div>
                        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                            Results ({results.length})
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-5">
                            {results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} local={false} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && query && results.length === 0 && (
                    <div className="text-white text-center text-lg sm:text-xl py-8">
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
}
