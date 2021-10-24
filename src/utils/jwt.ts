import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.JWT_SECRET || '';

export const sign = (payload: any) => jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token: string) => jwt.verify(token, secret);
