import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

//Connection test
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

app.get("/users", async (req, res) => {
  let result;
  try {
    result = await connectionPool.query(`select * from users`);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
});

app.get("/test", (req, res) => {
  res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
