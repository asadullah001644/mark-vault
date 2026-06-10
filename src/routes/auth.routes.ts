import { Router } from "express";
import { signUp } from "../controller/auth.controller";

const router = Router();

router.get("/", signUp);

export default router;
