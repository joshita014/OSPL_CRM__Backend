import express from "express";
import ProjectController from "./project.controller.js";
import jwtAuth from "../../middlewares/auth.middleware.js";

const projectRouter = express.Router();

const projectController = new ProjectController();

projectRouter.get("/", jwtAuth, projectController.getProjects);

export default projectRouter;
