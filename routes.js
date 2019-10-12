import { Router } from "express";

import ProjectController from './src/controllers/ProjectController';
import CheckProjectExistsMiddleware from './src/middlewares/CheckProjectExistsMiddleware';
import TaskController from "./src/controllers/TaskController";

const routes = new Router();

routes.get('/project', ProjectController.index);
routes.post('/project', ProjectController.create);
routes.put('/project/:id', CheckProjectExistsMiddleware, ProjectController.update);

routes.delete("/project/:id", CheckProjectExistsMiddleware, ProjectController.delete);

routes.post("/project/:id/tasks", CheckProjectExistsMiddleware, TaskController.create);

export default routes;