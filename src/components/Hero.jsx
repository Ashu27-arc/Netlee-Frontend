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
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] bg-cover bg-center text-white flex items-end fade-in"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      
      <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-2xl mb-3 sm:mb-4 animate-fade-in">
          {movie.title}
        </h1>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4">
          {movie.vote_average && (
            <span className="flex items-center gap-1 text-green-400 font-semibold">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
          )}
          {movie.release_date && (
            <span className="text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
          )}
        </div>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-lg line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 leading-relaxed max-w-3xl">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mt-3 sm:mt-4">
          <Link
            to={playLink}
            className="group bg-white text-black px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 font-bold rounded-lg hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 shadow-2xl hover:shadow-red-600/50"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            <span className="text-base sm:text-lg lg:text-xl font-bold">Play Now</span>
          </Link>
          <Link
            to={playLink}
            className="group bg-gray-800/90 backdrop-blur-md text-white px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 font-semibold rounded-lg hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 shadow-xl"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base sm:text-lg lg:text-xl font-semibold">More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
