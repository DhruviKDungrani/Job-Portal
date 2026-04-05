import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
// import { Link } from "lucide-react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from '../../utils/constant'
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res =  await axios.post(`${USER_API_END_POINT}/login`,input, {
        withCredentials: true    //here i added header which gave me error continuosly
      });

      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Backend server not reachable");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user){
      navigate("/");
    }
  },[]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 space-y-6"
        >
          <h1 className="font-bold text-xl mb-5 text-left">Login</h1>

          <div className="my-2">
            <Label className="block mb-1 text-left w-full">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="enter your email"
            />
          </div>

          <div className="my-2">
            <Label className="block mb-1 text-left w-full">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="enter your password"
            />
          </div>

          <div className="flex items-centre justify-between">
            <RadioGroup value={input.role} onValueChange={(value) => setInput({ ...input, role: value })} className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="student"
                  id="r1"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="recruiter"
                  id="r2"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="my-2 h-4 w-4 animate-spin"/>Please wait</Button> 
                    : <Button type="submit" className="w-full my-4"> Login </Button>
          }
          
          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
