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

            <div className="ml-60 p-10 w-full">
                <h1 className="text-3xl font-bold mb-6">Manage Movies</h1>

                {movies.map((m) => (
                    <AdminMovieRow key={m._id} movie={m} onDelete={deleteMovie} />
                ))}
            </div>
        </div>
    );
}
