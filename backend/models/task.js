const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", TaskSchema);
