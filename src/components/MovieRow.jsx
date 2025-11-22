import MovieCard from "./MovieCard";
import { useRef } from "react";

export default function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="group relative mb-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-4 sm:mb-5 flex items-center gap-2 hover:text-red-500 transition-colors duration-200">
        <span className="w-1 h-8 bg-red-600 rounded-full"></span>
        {title}
      </h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center shadow-2xl backdrop-blur-sm"
        aria-label="Scroll left"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={rowRef}
        className="flex overflow-x-scroll scrollbar-none space-x-3 sm:space-x-4 md:space-x-5 pb-4 sm:pb-5 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id || movie._id} movie={movie} local={!!movie._id} />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center shadow-2xl backdrop-blur-sm"
        aria-label="Scroll right"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
