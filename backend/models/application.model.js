import mongoose from 'mongoose';

const applicationSChema = new mongoose.Schema({
  job:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true 
  },

  applicant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  resumeUrl: {
    type: String,
    required: true,
    default:null
  },

  status: {
    type: String,
    enum : ["pending", "accepted", "rejected"],
    default: "pending"
  },
}, { timestamps: true});

export const Application = mongoose.model("Application", applicationSChema);