import { useEffect, useState, useMemo } from "react";
import { API } from "../utils/axios";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";

export default function Home() {
    const [data, setData] = useState({ 
        local: [], 
        trending: [],
        popular: [],
        topRated: [],
        upcoming: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const { data } = await API.get("/movies/home");
                setData(data);
            } catch (err) {
                console.error("Error fetching movies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, []);

    const heroMovie = useMemo(() => data.trending[0], [data.trending]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <Navbar />
                <div className="text-white text-lg sm:text-xl md:text-2xl">Loading movies...</div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            {/* HERO */}
            <Hero movie={heroMovie} />

            {/* Movie Rows */}
            <div className="relative -mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36 z-10 pb-2">
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
            </div>
        </div>
    );
}
