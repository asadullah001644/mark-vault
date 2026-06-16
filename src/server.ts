import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 8000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log("Server is running on port:", PORT));
};
start().catch((error) => {
  console.log("Failed to start server", error);
  process.exit(1);
});
