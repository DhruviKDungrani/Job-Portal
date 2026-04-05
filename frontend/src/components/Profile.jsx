import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

//const skills = ["Html","CSS","JavaScript","Reactjs"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="data:image/jpeg;base64,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"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-left">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="text-left">Skills</h1>
          <div className="flex items-center gap-1">
            {
            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                              : <span>NA</span>
            }
          </div>          
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 text-left">
            <Label className=" text-md font-bold">Resume</Label>
            {
              isResume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>
                       : <span>NA</span>
            }
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl text-left">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
           {/* Applied Job Table */}
           <AppliedJobTable/> 
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
