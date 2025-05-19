import { Router } from "express";
import { CoursesController } from "../controllers/courses-controller";
import { myMiddleware } from "../middlewares/my-middleware";


const coursesRoutes = Router();
const coursesController = new CoursesController()

coursesRoutes.get("/",  coursesController.index)
coursesRoutes.post("/", myMiddleware, coursesController.create)


export { coursesRoutes}