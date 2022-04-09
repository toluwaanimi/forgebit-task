import { JWT_SECRET } from '../../config/env.config';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../../models/user.model';
import { IJwtPayload } from '../interfaces/jwt.interface';

export class JwtHelper {
  static signToken(user: User) {
    const payload: IJwtPayload = {
      id: user.id,
    };
    return sign(payload, JWT_SECRET, { expiresIn: '1hr' });
  }

  static signRefreshToken(user: User) {
    const payload: IJwtPayload = {
      id: user.id,
    };
    return sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
  }

  static decrypt(token) {
    return verify(token, JWT_SECRET);
  }
}
