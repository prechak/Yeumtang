import express from "express";
import connectionPool from "./utils/db.mjs";
import borrowRouter from "./routes/borrow.mjs";
import repayRouter from "./routes/repay.mjs";
import summaryRouter from "./routes/summary.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/borrow", borrowRouter);
app.use("/api/repay", repayRouter);
app.use("/api/summary", summaryRouter);

// Connection test
async function connect() {
  try {
    await connectionPool.connect();
    console.log("Connected to Supabase PostgreSQL database");
  } catch {
    console.error("Error connecting to database:");
    process.exit(1);
  }
}
connect();

// Health check database connection
app.get("/health", async (req, res) => {
  try {
    await connectionPool.query("select 1");
    return res.status(200).json({ message: "Database connection is healthy" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error: Unable to connect to database",
    });
  }
});

// Test endpoint to check if the server is running
app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
