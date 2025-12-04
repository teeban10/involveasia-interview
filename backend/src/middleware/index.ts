import type { NextFunction, Request, Response } from 'express';

export default async function serverAuthentication (req: Request, res: Response, next: NextFunction) {
  try {
    const keyWithBearer = `Bearer ${process.env.API_KEY}`;
    if (req.headers.authorization !== keyWithBearer) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    console.log(`=== Middleware === ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}