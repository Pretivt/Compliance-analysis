



import { Product } from "../models/products.schema.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productCode,
      description,
      productType,
      company,
      complianceStatus,
      complianceScore,
      deviceClass,
      riskCategory,
      intendedUse,
      approvals,
      market,
    } = req.body;

    const regulatory = {
      deviceClass,
      riskCategory,
      intendedUse,
      market: JSON.parse(market),  // yeh frontend se string mei aa rhe hai inko array mei convert krne k liye 
      approvals: JSON.parse(approvals),
    };

    const images = req.files?.map((img) => ({
      url: img.path,
      publicId: img.filename,
    }));

    const product = await Product.create({
      productName,
      productCode,
      description,
      productType,
      company,
      createdBy: req.user.id,
      complianceStatus,
      complianceScore,
      regulatory,
      images,
    });

    return res.status(201).json({
      message: "Product created successfuly",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getProductsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;  // company ki id hmne routes se bheji hai 
    const products = await Product.find({
      company: companyId,
      createdBy: req.user.id,
    });
    return res.status(200).json({
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    return res.status(200).json({
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
