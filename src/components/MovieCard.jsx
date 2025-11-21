import { Link } from "react-router-dom";

export default function MovieCard({ movie, local }) {
  const img = local
    ? movie.thumbnail
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const linkTo = local ? `/watch/${movie._id}` : `/tmdb/${movie.id}`;

  return (
    <Link
      to={linkTo}
      className="min-w-[150px] relative transform transition-all hover:scale-110"
    >
      <img
        src={img}
        alt={movie.title || movie.name}
        className="rounded-lg shadow-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <p className="text-white text-sm font-semibold truncate">
          {movie.title || movie.name}
        </p>
      </div>
    </Link>
  );
}
