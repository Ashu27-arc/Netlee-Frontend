import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div className="w-48 sm:w-60 h-screen bg-gray-900 text-white fixed top-0 left-0 p-4 sm:p-6 z-30">
            <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-6 sm:mb-8">Admin Panel</h1>

            <nav className="space-y-3 sm:space-y-4">
                <Link className="block hover:text-red-500 transition text-sm sm:text-base" to="/admin/upload">
                    Upload Movie
                </Link>
                <Link className="block hover:text-red-500 transition text-sm sm:text-base" to="/admin/movies">
                    Manage Movies
                </Link>
                <Link className="block hover:text-red-500 transition text-sm sm:text-base" to="/admin/users">
                    Manage Users
                </Link>
            </nav>
        </div>
    );
}
