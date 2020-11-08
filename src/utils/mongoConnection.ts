import mongoose from 'mongoose';
import { appConfig } from '../config';

export const mongoConnection = mongoose.connect(appConfig.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
