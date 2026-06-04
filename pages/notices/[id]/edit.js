import NoticeForm from "../../../components/NoticeForm";

export async function getServerSideProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/notices/${params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const notice = await res.json();
  return { props: { notice } };
}

export default function EditNotice({ notice }) {
  const handleSubmit = async (form) => {
    const res = await fetch(`/api/notices/${notice.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    return res;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Edit Notice</h1>
        <div className="bg-white rounded-xl shadow p-6">
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