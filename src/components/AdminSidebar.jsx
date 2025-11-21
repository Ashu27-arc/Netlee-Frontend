import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div className="w-60 h-screen bg-gray-900 text-white fixed top-0 left-0 p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-8">Admin Panel</h1>

            <nav className="space-y-4">
                <Link className="block hover:text-red-500" to="/admin/upload">
                    Upload Movie
                </Link>
                <Link className="block hover:text-red-500" to="/admin/movies">
                    Manage Movies
                </Link>
            </nav>
        </div>
    );
}
