import { NextFunction, Request, Response } from "express";
import { AppException } from "../errors/AppException";

export class Session {
  public static async execute(req: Request, res: Response, next: NextFunction) {
		try {
			const X_API_KEY = req.headers.authorization || null;

			if (!X_API_KEY) {
				throw new AppException("X_API_KEY is required", 401);
			}

			if (X_API_KEY !== process.env.X_API_KEY) {
				throw new AppException("X_API_KEY is invalid", 401);
			}
			next();
		} catch (error : any) {
			return res.status(error.statusCode || 401 ).json({ message: error.message || "X_API_KEY is invalid" });
		}
  }
}
