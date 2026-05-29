



import { Organization } from "../models/organization.schema.js";

//   create
export const createOrganization = async (req, res, next) => {
  try {
    const {
      legalName,
      dbaName,
      address,
      primaryContact,
      phoneNumber,
      website,
      identifiers,
    } = req.body;

    if (!legalName || !dbaName) {
      return res.status(400).json({
        message: "LegalName or DbaName is required",
      });
    }
    const isCompanyExist = {
      $or: [{ dbaName }, { phoneNumber }, { website }],
    };
    const isComapany = await Organization.findOne(isCompanyExist);
    if (isComapany) {
      return res.status(400).json({
        message: "Company already exist",
      });
    }
    const organization = await Organization.create({
      legalName,
      dbaName,
      address,
      primaryContact,
      phoneNumber,
      website,
      identifiers,
      createdBy: req.user.id,
    });
    return res.status(201).json({
      message: " organization create successfully",
      data: organization,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//  read
export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Organization.find({ createdBy: req.user.id });
    if (!companies || companies.length === 0) {
      return res.status(400).json({
        message: "No Company available",
      });
    }
    return res.status(200).json({
      data: companies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};