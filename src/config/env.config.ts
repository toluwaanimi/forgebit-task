import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const PORT = env.get('PORT').required().asInt();
export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
