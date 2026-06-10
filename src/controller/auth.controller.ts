import { NextFunction, Request, Response } from "express";

const signUp = (req: Request, res: Response, next: NextFunction) => {
  res.json({ messsage: "From Sign up controller" });
};
export { signUp };
