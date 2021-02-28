import express from 'express';
import morgan from 'morgan';

import { connect } from './database';
import * as routes from './router';

require('dotenv').config();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middleware();
    this.database();
    this.routes();
  }

  private middleware() {
    this.express.use(express.json());
    this.express.use(morgan('dev'))
  }

  private database() {
    connect();
  }

  private routes() {
    this.express.use('/api/v1', [
      routes.serviceRouter,
    ]);
  }
}

export default new App().express;
