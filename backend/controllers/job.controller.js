import { Job } from "../models/job.model.js";


//admin will post
export const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirementRole,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    console.log("Request body received:", req.body); // Debugging log

    if (
      !title ||
      !description ||
      !requirementRole ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const job = await Job.create({  //this all field are indicate schema
      title,
      description,
      requirementRole: requirementRole.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience: experience,
      position,
      companyId: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true
    });

  } catch (error) {
    // console.log("Error in jobPost:", error); // Debugging log
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//students will get
export const getAllJobs = async(req, res) => {
  try {
    const keyword = req.query.keyword || " ";
    const query = {
      $or : [
        {title:{$regex:keyword, $options:"i"}}, // options i means case sensitive
        {description:{$regex:keyword, $options:"i"}}
      ]
    };

    const jobs = await Job.find(query).populate({//it will give company's info instead of only id
      path:"companyId",
    }).sort({created_by: -1});

    if(!jobs){
      return res.status(404).json({
        message:"Jobs not found",
        success: false
      });
    } 
    
    return res.status(200).json({
        jobs,
        success: true
      });

  } catch (error) {
    console.log(error);
    
  }
}

//students will get
export const getJobById = async(req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path : "applications",
    })
    if(!job){
      return res.status(404).json({
        message:"Job not found",
        success: false
      });
    } 
    
    return res.status(200).json({
        job,
        success: true
      });

  } catch (error) {
    console.log(error);
    
  }
}

//how many jobs are created by admin

export const getAdminJobs = async(req, res) => {
  try {
    const companyId = req.id;
   const jobs = await Job.find({ created_by: companyId })
      .populate({
        path: "companyId",
        select: "name", // Ensure only the 'name' field of the company is populated
        model: "Company", // Explicitly specify the model to populate
      })
      .sort({ created_by: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
   
    
  } catch (error) {
      console.log(error);    
  }
}