import { Router } from "express";
import { createBookmark } from "../controller/bookmark.controller";

const router = Router();
router.post("/", createBookmark);

export default router;
