import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  console.log("VERIFY PAGE OPENED");

  const { token } = useParams();

  console.log("TOKEN =>", token);
  
  const [status, setStatus] = useState("Verifying...");

  const navigate = useNavigate();

  const verifyEmail = async () => {
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setStatus("✅ Email Verified Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setStatus("❌ Email Verification Failed. Invalid or Expired Token.");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="relative w-full min-h-dvh overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">

  {/* Optional Glow Effect */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

  <div className="relative z-10 min-h-[calc(100dvh-80px)] flex items-center justify-center">
    
    <div
      className="
      w-full max-w-md
      rounded-2xl
      border border-cyan-500/30
      bg-gradient-to-br from-slate-800/90 to-slate-900/90
      backdrop-blur-md
      shadow-2xl shadow-cyan-500/10
      p-6 sm:p-8
      text-center
      "
    >
      
      <h2
        className="
        text-lg sm:text-xl md:text-2xl
        font-semibold
        text-cyan-400
        leading-relaxed
        break-words
        "
      >
        {status}
      </h2>

    </div>
  </div>
</div>
  );
};
export default VerifyEmail;
