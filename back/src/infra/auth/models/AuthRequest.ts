import { Request } from 'express';
import { User } from '@application/entities/users/user';

export interface AuthRequest extends Request {
  user: User;
}
