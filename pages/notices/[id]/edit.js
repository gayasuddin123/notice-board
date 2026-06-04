import NoticeForm from "../../../components/NoticeForm";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/notices/${params.id}`);
  if (!res.ok) return { notFound: true };
  const notice = await res.json();
  return { props: { notice } };
}

export default function EditNotice({ notice }) {
  const handleSubmit = async (form) => {
    return await fetch(`/api/notices/${notice.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            ← Back
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <h1 className="text-lg font-bold text-gray-900">Edit Notice</h1>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <NoticeForm
            initial={notice}
            onSubmit={handleSubmit}
            submitLabel="Update Notice"
          />
        </div>
      </div>
    </div>
  );
}