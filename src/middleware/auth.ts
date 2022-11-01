import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  console.log("failed");
  return res.status(400);
}
