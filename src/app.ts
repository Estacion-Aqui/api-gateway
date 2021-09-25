import express from 'express';
import cors from 'cors';

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
    this.express.use(express.json);
  }

  private routes() {
    this.express.use('/api/v1', [
      routes.projectRouter,
    ]);
  }
}

export default new App().express;
