import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.applicants);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        console.log('GET applicants response:', res.data.job);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
        toast.error("Failed to load applicants");
      }
    };

    if (params?.id) fetchAllApplicants();
  }, [params?.id, dispatch]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto text-left'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants
