import { useEffect, useState } from "react";
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

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const [homeRes, popularRes, topRatedRes, upcomingRes] = await Promise.all([
                    API.get("/movies/home"),
                    API.get("/movies/popular"),
                    API.get("/movies/top-rated"),
                    API.get("/movies/upcoming")
                ]);

                setData({
                    local: homeRes.data.local,
                    trending: homeRes.data.trending,
                    popular: popularRes.data,
                    topRated: topRatedRes.data,
                    upcoming: upcomingRes.data
                });
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };

        fetchAllMovies();
    }, []);

    const heroMovie = data.trending[0];

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            {/* HERO */}
            <Hero movie={heroMovie} />

            <div className="p-6 space-y-8">
                {data.local.length > 0 && (
                    <MovieRow title="Your Uploaded Movies" movies={data.local} local />
                )}
                <MovieRow title="Trending Now" movies={data.trending} />
                <MovieRow title="Popular Movies" movies={data.popular} />
                <MovieRow title="Top Rated" movies={data.topRated} />
                <MovieRow title="Upcoming" movies={data.upcoming} />
            </div>
        </div>
    );
}
