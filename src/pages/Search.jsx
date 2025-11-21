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

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-white text-4xl font-bold mb-8">Search Movies</h1>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for movies..."
                            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="text-white text-center text-xl">Searching...</div>
                )}

                {!loading && results.length > 0 && (
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-4">
                            Results ({results.length})
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} local={false} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && query && results.length === 0 && (
                    <div className="text-white text-center text-xl">
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
}
