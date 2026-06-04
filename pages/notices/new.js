import NoticeForm from "../../components/NoticeForm";

export default function NewNotice() {
  const handleSubmit = async (form) => {
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    return res;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Add Notice</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <NoticeForm onSubmit={handleSubmit} submitLabel="Create Notice" />
        </div>
      </div>
    </div>
  );
}