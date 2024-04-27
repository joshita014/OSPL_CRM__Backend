import Project from "./project.model.js";

export default class ProjectController {
  async getProjects(req, res) {
    const userId = req.userId;
    try {
      const project = await Project.find({ userId });

      if (project.length > 0) {
        return res.status(200).json({
          status: "success",
          message: "Project found",
          project: project,
        });
      } else {
        return res.status(404).json({
          status: "fail",
          message: "No projects found",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: "fail", message: "Internal server error" });
    }
  }
}
