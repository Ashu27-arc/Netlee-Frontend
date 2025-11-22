import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/axios";

export default function TMDBMoviePlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

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
        <div className="fixed inset-0 bg-black">
            {/* Back Button - Floating */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-20 px-4 py-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-lg text-sm transition-all backdrop-blur-sm"
            >
                ← Back
            </button>

            {/* Video Player - Absolute Full Screen */}
            {trailerVideo ? (
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                    title={movie.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : backdropUrl ? (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
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
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <p className="text-white text-xl">No video available</p>
                </div>
            )}

            {/* Movie Info Overlay - Bottom (Hidden by default, can be toggled) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent px-6 py-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                    
                    <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-300">
                        {movie.release_date && (
                            <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                        )}
                        {movie.runtime && <span>⏱️ {movie.runtime} min</span>}
                        {movie.vote_average && (
                            <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                        )}
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-2 py-1 bg-red-600 rounded-full text-xs"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-sm text-gray-300 line-clamp-2">
                        {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}
