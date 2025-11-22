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

    // Check for full movie video URL first (from database)
    const hasFullMovie = movie.fullMovieUrl || movie.fullMovieHlsUrl || movie.hasFullMovie;
    
    // Fallback to trailer if no full movie
    const trailerVideo = !hasFullMovie && movie.videos?.results?.find(
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
                className="absolute top-4 left-4 z-20 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-2"
            >
                <span className="text-lg">←</span>
                <span>Back</span>
            </button>

            {/* Video Player - Absolute Full Screen */}
            {hasFullMovie ? (
                <video
                    className="absolute inset-0 w-full h-full"
                    controls
                    autoPlay
                    controlsList="nodownload"
                >
                    {movie.fullMovieHlsUrl && (
                        <source src={movie.fullMovieHlsUrl} type="application/x-mpegURL" />
                    )}
                    {movie.fullMovieUrl && (
                        <source src={movie.fullMovieUrl} type="video/mp4" />
                    )}
                    Your browser does not support the video tag.
                </video>
            ) : trailerVideo ? (
                <div className="absolute inset-0 w-full h-full">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                        title={movie.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="absolute top-20 left-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">
                        ⚠️ Full movie not available. Playing trailer instead.
                    </div>
                </div>
            ) : backdropUrl ? (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
                        <p className="text-white text-2xl mb-4">🎬 Movie not available</p>
                        <p className="text-gray-300 text-sm">This movie hasn't been uploaded yet</p>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                    <p className="text-white text-2xl mb-4">🎬 Movie not available</p>
                    <p className="text-gray-300 text-sm">This movie hasn't been uploaded yet</p>
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
