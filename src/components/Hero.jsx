import { Link } from "react-router-dom";

export default function Hero({ movie }) {
  if (!movie) return null;

  const playLink = movie._id ? `/watch/${movie._id}` : `/tmdb/${movie.id}`;

  return (
    <div
      className="h-[70vh] bg-cover bg-center text-white flex flex-col justify-end p-10 relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      <div className="relative z-10">
        <h1 className="text-5xl font-bold drop-shadow-lg">{movie.title}</h1>
        <p className="max-w-xl mt-4 text-lg drop-shadow-lg line-clamp-3">{movie.overview}</p>

        <div className="flex gap-4 mt-6">
          <Link
            to={playLink}
            className="bg-white text-black px-8 py-3 font-semibold rounded hover:bg-gray-200 transition inline-flex items-center gap-2"
          >
            <span>▶</span> Play Now
          </Link>
          <Link
            to={playLink}
            className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 font-semibold rounded hover:bg-opacity-90 transition"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
