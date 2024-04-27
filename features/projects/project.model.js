import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "userId",
    },
    projectName: {
      type: String,
      default: "No projects assigned",
    },
    projectDetail: {
      type: Array,
      default: ["No details to show"],
    },
    lastUpdated: {
      type: String,
      default: "No updated for now",
    },
    associates: {
      type: Array,
      default: ["NA"],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
