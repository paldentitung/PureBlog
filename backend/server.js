import express from "express";
import cors from "cors";
import blogRoutes from "./routes/BlogRoutes.js";
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use("/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log("server running in  port", PORT);
});
