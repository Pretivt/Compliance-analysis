import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Framework } from './models/framework.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedFrameworks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for Framework seeding");

    const frameworks = [
      {
        name: "FDA 21 CFR Part 820",
        shortCode: "FDA-820",
        description: "Quality System Regulation (QSR) for medical device manufacturers. Ensures that finished devices will be safe and effective and otherwise in compliance with the Federal Food, Drug, and Cosmetic Act.",
        version: "2024.1",
        authority: "Food and Drug Administration (FDA)",
        country: "USA",
        appliesTo: ["company", "product"],
        industry: "Medical Devices",
        controls: [
          {
            controlId: "820.20",
            title: "Management Responsibility",
            description: "Requirements for management with executive responsibility to establish quality policy and organizational structure.",
            requirementText: "Management must establish a quality policy, ensure it is understood, and provide adequate resources for quality system activities.",
            mandatory: true,
            riskLevel: "high",
            tags: ["Governance", "Management"]
          },
          {
            controlId: "820.30",
            title: "Design Controls",
            description: "Controls to ensure that specified design requirements are met.",
            requirementText: "Establish and maintain procedures to control the design of the device in order to ensure that specified design requirements are met.",
            mandatory: true,
            riskLevel: "high",
            tags: ["Design", "R&D"]
          },
          {
            controlId: "820.70",
            title: "Production and Process Controls",
            description: "Requirements for production processes to ensure devices conform to specifications.",
            requirementText: "Establish and maintain process control procedures that describe any process controls necessary to ensure conformance to specifications.",
            mandatory: true,
            riskLevel: "medium",
            tags: ["Manufacturing", "Production"]
          }
        ]
      },
      {
        name: "ISO 13485:2016",
        shortCode: "ISO-13485",
        description: "International standard for Medical devices — Quality management systems — Requirements for regulatory purposes.",
        version: "2016",
        authority: "International Organization for Standardization",
        country: "International",
        appliesTo: ["company"],
        industry: "Medical Devices / Pharma",
        controls: [
          {
            controlId: "ISO-4.1",
            title: "General QMS Requirements",
            description: "Establishment of a documented quality management system.",
            requirementText: "The organization shall document a quality management system and maintain its effectiveness in accordance with the requirements of this International Standard.",
            mandatory: true,
            riskLevel: "high",
            tags: ["QMS", "Documentation"]
          },
          {
            controlId: "ISO-7.2",
            title: "Customer-related processes",
            description: "Determination of requirements related to product and review of requirements.",
            requirementText: "The organization shall determine requirements specified by the customer, including requirements for delivery and post-delivery activities.",
            mandatory: true,
            riskLevel: "medium",
            tags: ["Sales", "Customer"]
          }
        ]
      },
      {
        name: "FDA 21 CFR Part 211",
        shortCode: "FDA-211",
        description: "Current Good Manufacturing Practice (cGMP) for finished pharmaceuticals.",
        version: "2024.1",
        authority: "Food and Drug Administration (FDA)",
        country: "USA",
        appliesTo: ["product"],
        industry: "Pharmaceuticals",
        controls: [
          {
            controlId: "211.22",
            title: "Responsibilities of Quality Control Unit",
            description: "Establishment of a quality control unit with authority to approve or reject components and drug products.",
            requirementText: "There shall be a quality control unit that shall have the responsibility and authority to approve or reject all components, drug product containers, closures, and labeling.",
            mandatory: true,
            riskLevel: "high",
            tags: ["Quality Control", "Pharma"]
          },
          {
            controlId: "211.160",
            title: "General Laboratory Requirements",
            description: "Establishment of scientifically sound laboratory controls.",
            requirementText: "Establishment of any specifications, standards, sampling plans, or test procedures shall be drafted by the appropriate organizational unit and approved by quality control.",
            mandatory: true,
            riskLevel: "medium",
            tags: ["Laboratory", "Testing"]
          }
        ]
      }
    ];

    // Clear existing to avoid duplicates during seeding
    await Framework.deleteMany({ shortCode: { $in: frameworks.map(f => f.shortCode) } });
    
    await Framework.insertMany(frameworks);
    console.log("Seeded 3 regulatory frameworks successfully.");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedFrameworks();
