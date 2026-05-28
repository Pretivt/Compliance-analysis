import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    framework: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Framework",
      required: true,
    },
    reportText: {
      type: String,
      required: true,
    },
    complianceScore: {
      type: Number,
      default: 0, // AI estimated score
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);