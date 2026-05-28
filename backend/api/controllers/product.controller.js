// import { Product } from "../models/products.schema.js";

// export const createProduct = async (req, res, next) => {
//   console.log("yeh product page hai")
//  console.log(req.files)
// console.log(req.body)
//   try {
//     const {
//       productName,
//       productCode,
//       description,
//       productType,
//       company,
//       //createdBy,
//       complianceStatus,
//       complianceScore,
//       deviceClass,
//       riskCategory,
//       intendedUse,
//       approvals,
//       market,
//     } = req.body;
//     //parsing


//      const safeParseArray = (value) => {
//       if (!value) return [];

//       // If already array
//       if (Array.isArray(value)) return value;

//       // If string
//       if (typeof value === "string") {
//         try {
//           const parsed = JSON.parse(value);
//           return Array.isArray(parsed)
//             ? parsed
//             : value.split(",").map(v => v.trim()).filter(Boolean);
//         } catch (e) {
//           return value.split(",").map(v => v.trim()).filter(Boolean);
//         }
//       }

//       return [];
//     };

//     const safeParseJSON = (value) => {
//       if (!value) return [];

//       if (Array.isArray(value)) return value;

//       if (typeof value === "string") {
//         try {
//           return JSON.parse(value);
//         } catch (e) {
//           return [];
//         }
//       }

//       return [];
//     };

//     // -------------------------------
//     // PARSED DATA
//     // -------------------------------
//     const parsedMarket = safeParseArray(market);
//     const parsedApprovals = safeParseJSON(approvals);

//     const regulatory = {
//       deviceClass,
//       riskCategory,
//       intendedUse,
//       market: parsedMarket,
//       approvals:parsedApprovals ,
//     };

//     const images = req.files?.map((img) => ({
//       url: img.path,
//       publicId: img.filename,
//     })) || [];

//     const product = await Product.create({

//       productName,
//       productCode,
//       description,
//       productType,
//       company,
//       createdBy:req.user.id,
//       complianceStatus,
//       complianceScore,
//       regulatory,
//       images,
//     });

//     return res.status(201).json({
//       message: "Product created successfuly",
//       data: product,
//     });
//   } catch (err) {
    
//     console.log("product create error ")
//     console.log(err);
//     return res.status(500).json({
//         success: false,
//       message: err.message,
//       stack: err.stack,
//     });
//   }
// };

// export const getProductsByCompany = async (req, res) => {
//   try {
//     const { companyId } = req.params;
//     const products = await Product.find({ 
//       company: companyId,
//     createdBy: req.user.id,
//     });
//     return res.status(200).json({
//       data: products
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message
//     });
//   }
// };



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
