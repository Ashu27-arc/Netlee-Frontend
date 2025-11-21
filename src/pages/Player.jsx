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
        <div className="p-6 bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <video
                ref={videoRef}
                controls
                className="w-full max-w-4xl"
            >
            </video>
        </div>
    );

}