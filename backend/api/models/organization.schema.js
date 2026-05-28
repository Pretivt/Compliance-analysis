import mongoose from "mongoose";
import { randomUUID } from "crypto";

const companySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      index: true,
    },
    legalName: {
      type: String ,
      required: true,
      trim: true,
    },
    dbaName: { // doing bussiness as 
      type: String,
      required: true,
    },

    //  address
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    //  contact
    primaryContact: {
      name: String,
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
    phoneNumber: String,
    website: String,

    //  system fields:
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    //  regulatory:
    identifiers: {
      //  usa/ global
      fdafei: String,
      labellerCode: String,
      dunsNumber: String,   // global bussiness identification number

      //   indian/corporate
      cin: String,   // corporate identification number
      gstin: String, // gst registration number
      pan: String,

      //   indian regulatory
      cdsco: String, // central drugs standard control organization
      others: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Organization = mongoose.model("Organization", companySchema);
