import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applicants || {});
  const statusHndler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}, {withCredentials: true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const applications = applicants?.applications || [];

  // Debug: log applications to verify structure and resume fields
  // console.log('ApplicantsTable - applications:', applications);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-gray-500">
                No applicants yet
              </TableCell>
            </TableRow>
          )}

          {applications.map((item) => {
            
            const applicant = item?.applicant || {};
            const fullName = applicant?.fullname || applicant?.fullName || applicant?.name || "N/A";
            const email = applicant?.email || "-";
            const contact = applicant?.phoneNumber || applicant?.phone || "-";
            // Try multiple possible locations/names for resume URL and original filename
            const resumeUrl =
              applicant?.profile?.resume ||
              applicant?.profile?.resumeUrl ||
              applicant?.profile?.resume?.url ||
              applicant?.resume ||
              applicant?.resumeUrl ||
              item?.resume ||
              item?.resumeUrl ||
              null;

              console.log("ITEM:", item);
console.log("APPLICANT:", applicant);
console.log("RESUME URL:", resumeUrl);
            const resumeName =
              applicant?.profile?.resumeOriginalName ||
              applicant?.profile?.resumeName ||
              applicant?.profile?.resume?.originalName ||
              item?.resumeOriginalName ||
              item?.resumeName ||
              "Resume";
            const date = item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-";

            return (
              <TableRow key={item._id}>
                <TableCell>{fullName}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{contact}</TableCell>
                <TableCell>
                  {resumeUrl ? (
                    <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-blue-600">
                      {resumeName}
                    </a>
                  ) : (
                    <span>{resumeName}</span>
                  )}
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div onClick={() => statusHndler(status, item?._id)} key={index}>
                          <span className="flex w-fit items-center my-2 cursor-pointer">{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
