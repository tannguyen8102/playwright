import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL!,
  userEmail: process.env.USER_EMAIL!,
  userPassword: process.env.USER_PASSWORD!,
};