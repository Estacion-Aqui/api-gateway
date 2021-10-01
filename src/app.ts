import express, { Application, Router, RequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser, { urlencoded } from 'body-parser';

import pool from './config/database';

import * as routes from './router';
import { PoolClient } from 'pg';

require('dotenv').config();

class App {
  public express = express();

  public constructor() {
    this.middlewares();
    this.routes();
    // this.dbConnect();
  }


  private config() {
      this.express.use(bodyParser.urlencoded({ extended:true }));
      this.express.use(bodyParser.json({ limit: '1mb' })); // 100kb default
  }
  private middlewares() {
    this.express.use

    this.express.use(cors());
    this.express.use(express.json() as RequestHandler);
    this.express.use(express.urlencoded({ extended: true }) as RequestHandler);
  }

  private dbConnect() {
    pool.connect(function (err: Error, client: PoolClient, done: any) {
      if (err) throw err;
      console.log('Connected');
    });
  }

  private routes() {
    this.express.use('/api/v1', [
      routes.projectRouter,
    ]);
  }
}

export default new App().express;
