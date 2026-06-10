import express from "express";
import authRouter from "./routes/auth.routes";
import bookmarkRouter from "./routes/bookmark.routes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/bookmark",bookmarkRouter)

export default app;
