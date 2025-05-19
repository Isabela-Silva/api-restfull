import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import { myMiddleware } from "./middlewares/my-middleware";
import { knex} from "./database/knex"

import { routes } from "./routes/index";
import { AppError } from "./utils/app-error";
import { ZodError } from "zod";

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(myMiddleware);
app.use(routes);

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "validation error", issues: error.format() });
  }
  // error genetic
  response.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
