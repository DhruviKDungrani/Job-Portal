import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
      } catch (e) {}
      try {
        // client side cleanup
        localStorage.removeItem("token");
        // remove any other auth keys if used
        toast.success("Logged out");
      } catch (e) {}
      try {
        dispatch(setLoading(false));
      } catch (e) {}
      navigate("/login", { replace: true });
      // reload optional if app relies on fresh state
      // window.location.reload();
    })();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;