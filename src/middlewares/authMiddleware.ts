import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["auth"] as string;

  try {
    const payload = jwt.verify(token) as any;
    res.locals.jwtPayload = payload;

    const { userId, email } = payload;
    const newToken = jwt.sign({ userId, email });

    res.setHeader("token", newToken);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
}
