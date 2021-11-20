import dotenv from 'dotenv';

dotenv.config();
export const config = {
    APP_NAME: process.env.APP_NAME,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: Number(process.env.APP_PORT),

    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,

    JWT_SIGNING_METHOD: process.env.JWT_SIGNING_METHOD,
    JWT_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY,
    JWT_EXPIRED_MINUTES: Number(process.env.JWT_EXPIRED_MINUTES),
}