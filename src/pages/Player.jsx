import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HLS from "hls.js";
import { API } from "../utils/axios";

export default function Player() {
    const { id } = useParams();
    const videoRef = useRef();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        API.get('/movies/local/${id}').then((res) => {
            setMovie(res.data);
        });
    }, []);

    useEffect(() => {
        if (movie && HLS.isSupported()) {
            const hls = new HLS();
            hls.loadSource(movie.url);
            hls.attachMedia(videoRef.current);
        }
    }, [movie]);

    if (!movie) return "Loading...";

    return (
        <div className="fixed inset-0 bg-black flex flex-col">
            <div className="flex-shrink-0 px-4 py-3 bg-black bg-opacity-90">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{movie.title}</h1>
            </div>
            
            <div className="flex-1 flex items-center justify-center bg-black">
                <video
                    ref={videoRef}
                    controls
                    className="w-full h-full object-contain"
                >
                </video>
            </div>
        </div>
    );

}