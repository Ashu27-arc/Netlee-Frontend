export default function AdminMovieRow({ movie, onDelete }) {
    return (
        <div className="flex items-center bg-gray-800 p-3 rounded-lg mb-3">
            <img src={movie.thumbnail} className="w-16 h-24 sm:w-20 sm:h-28 rounded mr-3 sm:mr-4 object-cover" alt={movie.title} />

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm sm:text-base truncate">{movie.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                    {movie.year} • {movie.category}
                </p>
            </div>

            <button
                onClick={() => onDelete(movie._id)}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 rounded text-sm sm:text-base hover:bg-red-700 transition flex-shrink-0"
            >
                Delete
            </button>
        </div>
    );
}
