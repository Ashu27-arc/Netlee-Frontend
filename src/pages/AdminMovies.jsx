import { useEffect, useState } from "react";
import { API } from "../utils/axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminMovieRow from "../components/AdminMovieRow";

export default function AdminMovies() {
    const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/admin/movies", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(data);
    };

    const deleteMovie = async (id) => {
        const token = localStorage.getItem("token");
        await API.delete(`/admin/movie/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        loadMovies();
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <div className="flex bg-black min-h-screen text-white">
            <AdminSidebar />

            <div className="ml-48 sm:ml-60 p-4 sm:p-6 md:p-8 lg:p-10 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Manage Movies</h1>

                <div className="max-w-5xl">
                    {movies.length === 0 ? (
                        <p className="text-gray-400 text-sm sm:text-base">No movies uploaded yet.</p>
                    ) : (
                        movies.map((m) => (
                            <AdminMovieRow key={m._id} movie={m} onDelete={deleteMovie} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
