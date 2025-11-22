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
      className="group min-w-[120px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[240px] relative transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl ring-1 ring-gray-800/50 hover:ring-red-600/50 transition-all duration-300">
        {!imageLoaded && !imageError && (
          <div className="shimmer w-full aspect-[2/3] rounded-lg"></div>
        )}
        
        {imageError ? (
          <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            src={img}
            alt={movie.title || movie.name}
            loading="lazy"
            className={`w-full aspect-[2/3] object-cover rounded-lg transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:brightness-110`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-3 sm:p-4">
          <p className="text-white text-xs sm:text-sm font-bold mb-2 line-clamp-2 drop-shadow-lg">
            {movie.title || movie.name}
          </p>
          {movie.vote_average && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-yellow-400">{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
