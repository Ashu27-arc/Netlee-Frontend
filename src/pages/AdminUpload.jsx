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

            <div className="ml-60 p-10 w-full">
                <h1 className="text-3xl font-bold mb-6">Upload New Movie</h1>

                <form
                    className="space-y-4 bg-gray-900 p-6 rounded-lg"
                    onSubmit={submit}
                >
                    <input
                        placeholder="Title"
                        className="p-2 bg-gray-800 rounded w-full"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <textarea
                        placeholder="Description"
                        className="p-2 bg-gray-800 rounded w-full"
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <input
                        placeholder="Category"
                        className="p-2 bg-gray-800 rounded w-full"
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />

                    <input
                        placeholder="Year"
                        className="p-2 bg-gray-800 rounded w-full"
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                    />

                    <input
                        placeholder="Duration"
                        className="p-2 bg-gray-800 rounded w-full"
                        onChange={(e) =>
                            setForm({ ...form, duration: e.target.value })
                        }
                    />

                    <label className="block">
                        <span className="text-sm">Upload Video (MP4)</span>
                        <input
                            type="file"
                            className="bg-gray-800 p-2 rounded w-full"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Upload Thumbnail</span>
                        <input
                            type="file"
                            className="bg-gray-800 p-2 rounded w-full"
                            onChange={(e) => setThumb(e.target.files[0])}
                        />
                    </label>

                    <button
                        className="p-2 bg-red-600 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Movie"}
                    </button>
                </form>
            </div>
        </div>
    );
}
