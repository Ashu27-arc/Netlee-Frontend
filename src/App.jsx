import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Player from "./pages/Player";
import AdminUpload from "./pages/AdminUpload";
import { AuthProvider } from "./context/AuthContext";
import AdminMovies from "./pages/AdminMovies";
import TMDBMoviePlayer from "./pages/TMDBMoviePlayer";
import Search from "./pages/Search";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Movie Player */}
          <Route path="/watch/:id" element={<Player />} />
          <Route path="/tmdb/:id" element={<TMDBMoviePlayer />} />

          {/* Search */}
          <Route path="/search" element={<Search />} />

          {/* Admin */}
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/movies" element={<AdminMovies />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
