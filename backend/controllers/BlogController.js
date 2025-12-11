import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file
const filePath = path.join(__dirname, "../data/Blog.json");

// Helper function to read blogs
const getBlogs = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Express controller
export const getAllBlogs = (req, res) => {
  try {
    const blogs = getBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to read blogs" });
  }
};
