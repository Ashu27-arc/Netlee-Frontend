export default function AdminMovieRow({ movie, onDelete }) {
    return (
        <div className="flex items-center bg-gray-800 p-3 rounded-lg mb-3">
            <img src={movie.thumbnail} className="w-20 h-28 rounded mr-4" />

            <div className="flex-1">
                <h3 className="font-bold text-white">{movie.title}</h3>
                <p className="text-gray-400 text-sm">
                    {movie.year} • {movie.category}
                </p>
            </div>

            <button
                onClick={() => onDelete(movie._id)}
                className="px-4 py-1 bg-red-600 rounded"
            >
                Delete
            </button>
        </div>
    );
}
