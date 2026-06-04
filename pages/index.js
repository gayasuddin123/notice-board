import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotices = async () => {
    setLoading(true);
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
    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (res.ok) fetchNotices();
    else alert("Failed to delete notice");
  };

  const categoryColors = {
    Exam: "bg-purple-100 text-purple-700",
    Event: "bg-blue-100 text-blue-700",
    General: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg">
              N
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notice Board</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Stay updated with latest notices</p>
            </div>
          </div>
          <Link
            href="/notices/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow"
          >
            <span className="text-lg leading-none">+</span>
            <span>Add Notice</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats bar */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl font-bold text-indigo-600">{notices.length}</span>
            <span className="text-sm text-gray-500">Total Notices</span>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl font-bold text-red-500">
              {notices.filter((n) => n.priority === "Urgent").length}
            </span>
            <span className="text-sm text-gray-500">Urgent</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading notices...</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">📋</div>
            <h2 className="text-xl font-semibold text-gray-700">No notices yet</h2>
            <p className="text-gray-400 text-sm">Click "Add Notice" to create your first one</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-white rounded-2xl shadow-sm border flex flex-col justify-between transition-shadow hover:shadow-md ${
                  notice.priority === "Urgent"
                    ? "border-red-200 ring-1 ring-red-100"
                    : "border-gray-100"
                }`}
              >
                {/* Card top color bar */}
                <div
                  className={`h-1.5 rounded-t-2xl ${
                    notice.priority === "Urgent" ? "bg-red-500" : "bg-indigo-400"
                  }`}
                />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Badges */}
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        categoryColors[notice.category] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {notice.category}
                    </span>
                    {notice.priority === "Urgent" && (
                      <span className="text-xs font-bold bg-red-100 text-red-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        🔴 Urgent
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  {notice.image && (
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full h-36 object-cover rounded-xl"
                    />
                  )}

                  {/* Title & Body */}
                  <div>
                    <h2 className="text-base font-bold text-gray-900 leading-snug">
                      {notice.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-3 leading-relaxed">
                      {notice.body}
                    </p>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-auto">
                    📅 {new Date(notice.publishDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 flex gap-2">
                  <button
                    onClick={() => router.push(`/notices/${notice.id}/edit`)}
                    className="flex-1 text-sm font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 rounded-xl transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="flex-1 text-sm font-medium bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-xl transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}