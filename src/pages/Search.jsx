import { useState } from "react";
import { API } from "../utils/axios";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const res = await API.get(`/movies/search?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error("Search error:", err);
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
                    <div className="text-white text-center text-lg sm:text-xl">Searching...</div>
                )}

                {!loading && results.length > 0 && (
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

                {!loading && query && results.length === 0 && (
                    <div className="text-white text-center text-lg sm:text-xl">
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
}
