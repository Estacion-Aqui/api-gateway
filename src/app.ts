import express, { RequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser, { urlencoded } from 'body-parser';

import * as routes from './router';

require('dotenv').config();

class App {
  public express = express();

  public constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use

    this.express.use(cors());
    this.express.use(express.json() as RequestHandler);
    this.express.use(express.urlencoded({ extended: true }) as RequestHandler);
  }

  private routes() {
    this.express.use('/api/v1', [
      routes.projectRouter,
    ]);
  }
}

export default new App().express;
