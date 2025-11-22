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
    <div className="group relative mb-0 px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold mb-2 sm:mb-3 hover:text-red-500 transition-colors duration-200">
        {title}
      </h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-2.5 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block shadow-lg"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={rowRef}
        className="flex overflow-x-scroll scrollbar-none space-x-2 sm:space-x-3 md:space-x-3 lg:space-x-4 pb-3 sm:pb-4"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id || movie._id} movie={movie} local={!!movie._id} />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-2.5 rounded-l-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block shadow-lg"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
