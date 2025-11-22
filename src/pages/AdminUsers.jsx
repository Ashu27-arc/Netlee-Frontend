import { useState, useEffect, useContext } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { API } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchUsers();
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await API.get("/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
            alert(err.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!confirm(`Are you sure you want to delete user: ${userName}?`)) return;

        try {
            const token = localStorage.getItem("token");
            await API.delete(`/admin/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("User deleted successfully");
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
            alert(err.response?.data?.message || "Failed to delete user");
        }
    };

    const handleToggleRole = async (userId, currentRole, userName) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (!confirm(`Change ${userName}'s role to ${newRole}?`)) return;

        try {
            const token = localStorage.getItem("token");
            await API.put(`/admin/user/${userId}/role`, 
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("User role updated successfully");
            fetchUsers();
        } catch (err) {
            console.error("Error updating role:", err);
            alert(err.response?.data?.message || "Failed to update role");
        }
    };

    if (loading) {
        return (
            <div className="flex">
                <AdminSidebar />
                <div className="ml-48 sm:ml-60 flex-1 p-4 sm:p-8 bg-black min-h-screen text-white">
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-48 sm:ml-60 flex-1 p-4 sm:p-8 bg-black min-h-screen text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">User Management</h1>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-800 transition">
                                        <td className="px-4 py-3 text-sm">{u.name}</td>
                                        <td className="px-4 py-3 text-sm">{u.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                                u.role === 'admin' 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'bg-blue-600 text-white'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-400">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => handleToggleRole(u._id, u.role, u.name)}
                                                    disabled={u._id === user._id}
                                                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                                        u._id === user._id
                                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                                >
                                                    {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(u._id, u.name)}
                                                    disabled={u._id === user._id}
                                                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                                        u._id === user._id
                                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                                    }`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No users found
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-400">
                    Total Users: {users.length}
                </div>
            </div>
        </div>
    );
}
