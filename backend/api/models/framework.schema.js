


import mongoose from "mongoose";
import { randomUUID } from "crypto";

const frameworkSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      index: true, // for faster searching 
    },
    name: {
      type: String,
      required: true,
      trim: true, // removing extra spaces 
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    description: String,
    version: {
      type: String,
      default: "1.0",
    },
    authority: {
      type: String,
    },
    country: String,

    appliesTo: {
      type: [String],
      enum: ["company", "product"],
    },
    industry: String,

    controls: [
      {
        controlId: String,
        title: String,
        description: String,
        requirementText: String,
        mandatory: {
          type: Boolean,
          default: true,
        },
        riskLevel: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        tags: [String],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  {
    timestamps: true, // ❌ tumne timeStamps likha tha (गलत)
  }
);

// ✅ FIX
export const Framework = mongoose.model("Framework", frameworkSchema);