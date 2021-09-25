import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import * as routes from './router';

require('dotenv').config();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());

    this.express.use(morgan('dev'))
  }

  private routes() {
    this.express.use('/api/v1', [
      routes.projectRouter,
    ]);
  }
}

export default new App().express;
