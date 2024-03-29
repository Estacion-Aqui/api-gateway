import express, { RequestHandler } from 'express';
import cors from 'cors';

import * as routes from './router';

class App {
  public app = express();

  public constructor() {
    this.middlewares();
    this.routes();
    // this.dbConnect();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json() as RequestHandler);
    this.app.use(express.urlencoded({ extended: true }) as RequestHandler);
  }

  private routes() {
    this.app.use('/api/v1', [
      routes.projectRouter,
      routes.userRouter,
      routes.spotRouter,
      routes.placeRouter,
      routes.areaRouter,
      routes.sectorRouter,
      routes.authRouter,
      routes.adminRouter
    ]);
  }
}

export default new App().app;
