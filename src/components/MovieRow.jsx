import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  return (
    <div className="my-8">
      <h2 className="text-xl text-white font-bold mb-3">{title}</h2>

      <div className="flex overflow-x-scroll scrollbar-none space-x-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id || movie._id} movie={movie} local={!!movie._id} />
        ))}
      </div>
    </div>
  );
}
