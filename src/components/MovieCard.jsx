import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ movie, local }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const img = local
    ? movie.thumbnail
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const linkTo = local ? `/watch/${movie._id}` : `/tmdb/${movie.id}`;

  return (
    <Link
      to={linkTo}
      className="group min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] relative transform transition-all duration-300 hover:scale-105 hover:z-20"
    >
      <div className="relative overflow-hidden rounded-lg shadow-xl ring-1 ring-gray-800/50 hover:ring-2 hover:ring-red-500 transition-all duration-300">
        {!imageLoaded && !imageError && (
          <div className="shimmer w-full aspect-[2/3] rounded-lg"></div>
        )}
        
        {imageError ? (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg">
            <svg className="w-10 h-10 sm:w-14 sm:h-14 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
        ) : (
          <img
            src={img}
            alt={movie.title || movie.name}
            loading="lazy"
            className={`w-full aspect-[2/3] object-cover rounded-lg transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:brightness-75`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="bg-red-600 rounded-full p-3 sm:p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg p-3 sm:p-4">
          <p className="text-white text-xs sm:text-sm font-bold mb-1.5 line-clamp-2 drop-shadow-lg">
            {movie.title || movie.name}
          </p>
          {movie.vote_average && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-yellow-400 text-xs sm:text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
