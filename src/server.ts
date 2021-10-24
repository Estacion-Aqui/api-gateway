import dotenv from 'dotenv';
import app from "./app"
import 'reflect-metadata';
import './config/database';

dotenv.config();

app.listen(process.env.PORT || 4000, () => {
  console.log('🏃 Running Server');
})
