import { useEffect, useState, useMemo, useContext } from "react";
import { API } from "../utils/axios";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState({ 
        local: [], 
        trending: [],
        popular: [],
        topRated: [],
        upcoming: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllMovies = async () => {
        try {
            setError(null);
            const { data } = await API.get("/movies/home");
            setData(data || {
                local: [],
                trending: [],
                popular: [],
                topRated: [],
                upcoming: []
            });
            console.log("✅ Movies fetched successfully:", {
                local: data?.local?.length || 0,
                trending: data?.trending?.length || 0,
                popular: data?.popular?.length || 0,
                topRated: data?.topRated?.length || 0,
                upcoming: data?.upcoming?.length || 0,
            });
        } catch (err) {
            console.error("❌ Error fetching movies:", err);
            setError("Failed to load movies. Please try again.");
            setData({
                local: [],
                trending: [],
                popular: [],
                topRated: [],
                upcoming: []
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllMovies();
    }, []);

    const heroMovie = useMemo(() => {
        if (data.trending && data.trending.length > 0) {
            return data.trending[0];
        }
        if (data.popular && data.popular.length > 0) {
            return data.popular[0];
        }
        if (data.local && data.local.length > 0) {
            return data.local[0];
        }
        return null;
    }, [data.trending, data.popular, data.local]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
                    <div className="text-white text-lg sm:text-xl md:text-2xl">Loading movies...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            {/* HERO */}
            <Hero movie={heroMovie} />

            {/* Movie Rows */}
            <div className="relative -mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36 z-10 pb-12">
                {/* Greeting */}
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-6 sm:mb-8">
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl md:text-5xl">👋</span>
                        <span>Hello, {user?.name || "Guest"}!</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base mt-2">What would you like to watch today?</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 mb-6 bg-red-600/20 border border-red-600/50 rounded-lg p-4">
                        <p className="text-red-400 text-center">{error}</p>
                        <button
                            onClick={fetchAllMovies}
                            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {data.local && data.local.length > 0 && (
                    <MovieRow title="Your Uploaded Movies" movies={data.local} />
                )}
                {data.trending && data.trending.length > 0 && (
                    <MovieRow title="Trending Now" movies={data.trending} />
                )}
                {data.popular && data.popular.length > 0 && (
                    <MovieRow title="Popular Movies" movies={data.popular} />
                )}
                {data.topRated && data.topRated.length > 0 && (
                    <MovieRow title="Top Rated" movies={data.topRated} />
                )}
                {data.upcoming && data.upcoming.length > 0 && (
                    <MovieRow title="Upcoming" movies={data.upcoming} />
                )}

                {/* Empty State */}
                {!loading && !error && 
                 !data.local?.length && 
                 !data.trending?.length && 
                 !data.popular?.length && 
                 !data.topRated?.length && 
                 !data.upcoming?.length && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-400 text-lg mb-2">No movies available</p>
                        <p className="text-gray-600 text-sm">Check back later</p>
                    </div>
                )}
            </div>
        </div>
    );
}
