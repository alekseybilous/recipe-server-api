import { config } from 'dotenv';

config();

export interface IAppConfig {
  MONGO_URI: string;
  SECRET: string;
  SESSION_SECRET: string;
  PORT: string;
  NODE_ENV: string;
}

export const appConfig: IAppConfig = {
  MONGO_URI: process.env.MONGO_URI || '',
  NODE_ENV: process.env.NODE_ENV || '',
  PORT: process.env.PORT || '',
  SECRET: process.env.SECRET || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
};
