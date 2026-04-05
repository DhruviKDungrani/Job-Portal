import {Company} from "../models/company.model.js";
import {getDataUri} from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async(req, res) => {
  try {
   const {companyName} = req.body;
   if(!companyName){
    return res.status(400).json({
      message: "Company name is required",
      success: false
    });
   }

   let company = await Company.findOne({ name: companyName });
   if(company){
    return res.status(400).json({
      message: "You can't register same company",
      success: false
    });
   }

   //create company
   company = await Company.create({
    name: companyName,   //rest os are not required 
    companyID: req.id   // logged in user id

   })

   return res.status(201).json({
    message: "Company created successfully",
    company,
    success: true
   });

  } catch (error) {
    console.log(error);
    
  }
}


//get company  -> user ne jitni company me register kiya hoga wo sab usko dikhana hoga 

export const getCompany = async(req,res) => {

  try{
      const companyID = req.id; //logged user id...in database we wrote id name companyID...we can write userId in database and use here with same name
      const companies = await Company.find({companyID});
      if(!companies){
        return res.status(404).json({
         message: "Companies not found",
         success: false
        });
      }

  return res.status(200).json({
    message: "fetched",  //it is only for testing
    companies,
    success: true
  });

  }  catch(error){
    console.log(error);   
    
  }
}


//get company by company ID  and company id se single company hi milegi
export const getCompanyById = async(req,res) => {

  try {

    const companyId = req.params.id; //logged user id
    const company = await Company.findById(companyId);
    if(!company){
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch(error) {
    console.log(error);
  }
}


export const updateCompany = async(req,res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { id } = req.params;
    const {name, description, location, website} = req.body;
    console.log(name,description,location,website);
    
     // Check if a file was uploaded
    const logoo = req.files?.logo?.[0]; // Access the uploaded file
    let logoUrl;
    if (!logoo) {
      return res.status(400).json({ success: false, message: "Logo file is required." });
    }
    
    const file = req.file // to update logo

    //cloudinary code will be here for logo upload
    const fileUri = getDataUri(logoo);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updatedData = {name, description, location, website, logo};

    const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new : true});

    if(!company){
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        name,
        description,
        website,
        location,
        ...(logoUrl && { logo: logoUrl }), // Only update logo if it exists
      },
      { new: true }
    );

     return res.status(200).json({
        message: "Company information updated",
        success: true,
        company: updatedCompany
      });


  } catch (error) {
    console.log(error);
    
  }
}