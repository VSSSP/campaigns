import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validationMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details.map((err) => err.message).join(', ') });
    }
    next();
  };
}
