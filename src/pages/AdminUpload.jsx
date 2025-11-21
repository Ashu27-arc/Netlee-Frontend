import { useState } from "react";
import { API } from "../utils/axios";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUpload() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        year: "",
        duration: "",
    });

    const [video, setVideo] = useState(null);
    const [thumb, setThumb] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        Object.keys(form).forEach((k) => fd.append(k, form[k]));
        fd.append("video", video);
        fd.append("thumbnail", thumb);

        const token = localStorage.getItem("token");

        try {
            await API.post("/admin/upload", fd, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Movie Uploaded Successfully!");
        } catch {
            alert("Upload failed");
        }

        setLoading(false);
    };

    return (
        <div className="flex bg-black min-h-screen text-white">
            <AdminSidebar />

            <div className="ml-48 sm:ml-60 p-4 sm:p-6 md:p-8 lg:p-10 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Upload New Movie</h1>

                <form
                    className="space-y-3 sm:space-y-4 lg:space-y-5 bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg max-w-3xl"
                    onSubmit={submit}
                >
                    <input
                        placeholder="Title"
                        className="p-2 sm:p-3 bg-gray-800 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <textarea
                        placeholder="Description"
                        className="p-2 sm:p-3 bg-gray-800 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[80px]"
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <input
                        placeholder="Category"
                        className="p-2 sm:p-3 bg-gray-800 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />

                    <input
                        placeholder="Year"
                        className="p-2 sm:p-3 bg-gray-800 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                    />

                    <input
                        placeholder="Duration"
                        className="p-2 sm:p-3 bg-gray-800 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        onChange={(e) =>
                            setForm({ ...form, duration: e.target.value })
                        }
                    />

                    <label className="block">
                        <span className="text-xs sm:text-sm mb-1 block">Upload Video (MP4)</span>
                        <input
                            type="file"
                            className="bg-gray-800 p-2 sm:p-3 rounded w-full text-xs sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs sm:text-sm mb-1 block">Upload Thumbnail</span>
                        <input
                            type="file"
                            className="bg-gray-800 p-2 sm:p-3 rounded w-full text-xs sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
                            onChange={(e) => setThumb(e.target.files[0])}
                        />
                    </label>

                    <button
                        className="p-3 bg-red-600 rounded w-full font-semibold hover:bg-red-700 transition text-sm sm:text-base disabled:bg-gray-700 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Movie"}
                    </button>
                </form>
            </div>
        </div>
    );
}
