import router from './controllers/conversion.js';
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();
const PORT = process.env.PORT;

class Application {
  constructor() {
    this.app = express();
    this.app.use(cors());
  }

  useMiddleware() {
    this.app.use(express.json());
    this.app.use('/conversions', router);
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`Application is listening on port ${PORT}`);
    });
  }

  static async main() {
      const app = new Application();
      app.useMiddleware();
      app.listen();
  }
}

export default Application;