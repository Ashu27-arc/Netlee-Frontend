import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HLS from "hls.js";
import { API } from "../utils/axios";

export default function Player() {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef();
    const hlsRef = useRef(null);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("Movie ID is missing");
            setLoading(false);
            return;
        }

        API.get(`/movies/local/${id}`)
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching movie:", err);
                setError("Failed to load movie. Please try again.");
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (!movie || !videoRef.current) return;

        const videoUrl = movie.hlsUrl || movie.videoUrl;
        if (!videoUrl) {
            setError("No video URL available");
            return;
        }

        // Cleanup previous HLS instance
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (HLS.isSupported()) {
            const hls = new HLS({
                enableWorker: true,
                lowLatencyMode: false,
            });
            hls.loadSource(videoUrl);
            hls.attachMedia(videoRef.current);
            hlsRef.current = hls;

            hls.on(HLS.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case HLS.ErrorTypes.NETWORK_ERROR:
                            console.error("Network error, trying to recover...");
                            hls.startLoad();
                            break;
                        case HLS.ErrorTypes.MEDIA_ERROR:
                            console.error("Media error, trying to recover...");
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error("Fatal error, destroying HLS instance");
                            hls.destroy();
                            setError("Video playback error. Please try again.");
                            break;
                    }
                }
            });
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            // Native HLS support (Safari)
            videoRef.current.src = videoUrl;
        } else {
            setError("HLS is not supported in your browser");
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [movie]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading movie...</div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-4">
                <div className="text-white text-xl mb-4 text-center">{error || "Movie not found"}</div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
                >
                    Go Back
                </button>
            </div>
        );
    }

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

            {/* Video Player - Full Screen */}
            <video
                ref={videoRef}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full"
            >
                Your browser does not support the video tag.
            </video>

            {/* Movie Info Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent px-6 py-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold">{movie.title}</h1>
                    {movie.description && (
                        <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                            {movie.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}