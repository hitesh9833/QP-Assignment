import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

const authenticate = (roles: string[] = []) => {
    // console.log("bhai");
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      if (roles.length && !roles.includes((decoded as any).role)) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authenticate;
