import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// connect to the server
import connectDB from "./mongodb/connect.js";
// routes
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

// to use express
const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));

// creating API endpoints that we can connect from our frontend
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// to ensure server is working
app.get("/", async (req, res) => {
  res.send("Hello from DALLE-2");
});

// to run express server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
