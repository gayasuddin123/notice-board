import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmed) return;

    const res = await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchNotices();
    } else {
      alert("Failed to delete notice");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Notice Board</h1>
          <Link
            href="/notices/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
          >
            + Add Notice
          </Link>
        </div>
      </div>

      {/* Notices Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices yet. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-xl shadow p-5 flex flex-col justify-between border border-gray-100"
              >
                {/* Top */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      {notice.category}
                    </span>
                    {notice.priority === "Urgent" && (
                      <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded">
                        🔴 Urgent
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mt-2">
                    {notice.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                    {notice.body}
                  </p>
                </div>

                {/* Bottom */}
                <div>
                  <p className="text-xs text-gray-400 mt-3">
                    📅 {new Date(notice.publishDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => router.push(`/notices/${notice.id}/edit`)}
                      className="flex-1 text-sm bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="flex-1 text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}