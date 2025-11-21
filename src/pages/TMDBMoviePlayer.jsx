import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/axios";
import Navbar from "../components/Navbar";

export default function TMDBMoviePlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/movies/tmdb/${id}`)
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching movie:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="text-white text-2xl">Movie not found</div>
            </div>
        );
    }

    const trailerVideo = movie.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    ← Back
                </button>

                {/* Video Player */}
                <div className="mb-8">
                    {trailerVideo ? (
                        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                                title={movie.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : backdropUrl ? (
                        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                            <img
                                src={backdropUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <p className="text-white text-xl">Trailer not available</p>
                            </div>
                        </div>
                    ) : (
                        <div className="aspect-video w-full bg-gray-900 rounded-lg flex items-center justify-center">
                            <p className="text-white text-xl">No video available</p>
                        </div>
                    )}
                </div>

                {/* Movie Info */}
                <div className="text-white">
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-gray-300">
                        {movie.release_date && (
                            <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                        )}
                        {movie.runtime && <span>⏱️ {movie.runtime} min</span>}
                        {movie.vote_average && (
                            <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                        )}
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-red-600 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        {movie.overview}
                    </p>

                    {/* Cast */}
                    {movie.credits?.cast && movie.credits.cast.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Cast</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {movie.credits.cast.slice(0, 6).map((actor) => (
                                    <div key={actor.id} className="text-center">
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full rounded-lg mb-2"
                                            />
                                        ) : (
                                            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                                                <span className="text-4xl">👤</span>
                                            </div>
                                        )}
                                        <p className="font-semibold text-sm">{actor.name}</p>
                                        <p className="text-xs text-gray-400">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
