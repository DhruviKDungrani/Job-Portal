import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyJob = async(req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;  
    if(!jobId){
      return res.status(400).json({
        message: 'Job id is required',
        success: false
      });
    }

      //check if user has already apply for the job
      const existingApplication = await Application.findOne({job: jobId, applicant: userId});
      if(existingApplication){
        return res.status(400).json({
          message:"You have already applied for this job",
          success: false
        });
      }

      //check if job exist
      const job = await Job.findById(jobId);
      if(!job){
        return res.status(400).json({
          message:"Job not found",
          success: false
        });
      }

      //create a new application
      const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
        resumeUrl: req.query.resumeUrl
      });

      job.applications.push(newApplication._id);
      await job.save();

      return res.status(200).json({
        message: "Job applied successfully",
        success: true
      });
    
  } catch (error) {
      console.log(error);
  }
}



export const getAppliedJobs = async (req,res) => {
  
  try {
    const userId = req.id;
    const application = await Application.find({applicant:userId}).sort({createdAt : -1}).populate({
      path: 'job',  //write which is use in schema job/jobs
      options: {sort:{createdAt: -1}},
      populate : {
        path:'companyId',
        options: {sort:{createdAt: -1}},
      }        //use again bcz inside jobs we have companies
    });

    if(!application){
      return res.status(400).json({
        message: "No applications",
        success: false
      });
    }
   
      return res.status(200).json({
        application,
        success: true
      });

  } catch (error) {
      console.log(error);
      
  }
}



//admin will check that how many applicants applied for job which i posted
export const getApplicants = async(req, res) => {
  try {
    const jobId = req.params.id;   //first find the job and then check that how many applied for that job
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: {sort:{createdAt:-1}},
      populate: {
        path: 'applicant',
        options: {sort:{createdAt:-1}}
      }
    });

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




export const updateStatus = async(req, res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;

    if(!status){
      return res.status(400).json({
      message: 'status is required', 
      success: false
    });
    }

    //find application by applicantion id 
    const applicantion = await Application.findOne({_id : applicationId});
    if(!applicantion){
      return res.status(404).json({
        message: "Appliaction not found",
        success: false
      })
    }

    //update the status
    applicantion.status = status.toLowerCase();
    await applicantion.save();

     return res.status(200).json({
        message: "Status updated successfully",
        success: true
      });

  } catch (error) {
      console.log(error);
      
  }
}