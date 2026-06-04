import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === "GET") {
    try {
      console.log("Attempting DB connection...");
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });
      console.log("DB success:", notices);
      return res.status(200).json(notices);
    } catch (error) {
      console.error("DB ERROR FULL:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "POST") {
    const { title, body, category, priority, publishDate, image } = req.body;

    // Server side validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!body || body.trim() === "") {
      return res.status(400).json({ error: "Body is required" });
    }
    if (!category || !["Exam", "Event", "General"].includes(category)) {
      return res.status(400).json({ error: "Valid category is required" });
    }
    if (!priority || !["Normal", "Urgent"].includes(priority)) {
      return res.status(400).json({ error: "Valid priority is required" });
    }
    if (!publishDate || isNaN(new Date(publishDate).getTime())) {
      return res.status(400).json({ error: "Valid date is required" });
    }

    try {
      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });
      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create notice" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}