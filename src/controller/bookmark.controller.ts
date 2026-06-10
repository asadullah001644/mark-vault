import { NextFunction, Request, Response } from "express";

const createBookmark = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "From create bookmark" });
};

export { createBookmark };
