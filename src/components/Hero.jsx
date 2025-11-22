import { Link } from "react-router-dom";

export default function Hero({ movie }) {
  if (!movie) {
    return (
      <div className="h-[80vh] bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="shimmer h-full w-full"></div>
      </div>
    );
  }

  const playLink = movie._id ? `/watch/${movie._id}` : `/tmdb/${movie.id}`;

  return (
    <div
      className="relative h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] bg-cover bg-center text-white flex items-end fade-in"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
      
      <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28 max-w-5xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full mb-4 animate-fade-in">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-bold text-sm">Featured</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black drop-shadow-2xl mb-4 sm:mb-5 animate-fade-in leading-tight">
          {movie.title}
        </h1>
        
        <div className="flex items-center gap-4 sm:gap-5 text-sm sm:text-base md:text-lg mb-4 sm:mb-5">
          {movie.vote_average && (
            <span className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/30">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-yellow-400">{movie.vote_average.toFixed(1)}</span>
            </span>
          )}
          {movie.release_date && (
            <span className="bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700 font-semibold">
              {new Date(movie.release_date).getFullYear()}
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-lg line-clamp-2 sm:line-clamp-3 mb-6 sm:mb-8 leading-relaxed max-w-3xl font-medium">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            to={playLink}
            className="group bg-red-600 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 font-bold rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-red-600/50"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            <span className="text-lg sm:text-xl font-bold">Play Now</span>
          </Link>
          <Link
            to={playLink}
            className="group bg-white/10 backdrop-blur-md text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 font-bold rounded-xl hover:bg-white/20 border-2 border-white/30 hover:border-white/50 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 shadow-xl"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-lg sm:text-xl font-bold">More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
