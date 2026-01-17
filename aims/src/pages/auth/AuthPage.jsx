import { useState } from 'react';

import EmailInput from '@/components/auth/EmailInput';
import OTPInput from '@/components/auth/OtpInput';
import {USER_ROLES , ROUTES} from '@/config/constants'


const mockUsers = {
  "ayushsonika1@gmail.com": { role: "student" },
  "ayushsonika1+1@gmail.com": { role: "instructor" }
};

export default function App() {
    const [step , setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [role , setRole] = useState(null);



  const handleSubmit = ( e, step) => {
    e.preventDefault();
    if(step == "email") {
        console.log('Email submitted:', email);
        setStep("otp")
    }
  };

  const handleVerifyOTP = (otp) => {
    console.log("OTP Verified:", otp);
    setRole(mockUsers[email].role);

  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  const handleBack = () => {
    setStep("email");
  };

    const redirectToDashboard = (userRole) => {
    switch (userRole) {
      case USER_ROLES.STUDENT:
        navigate(ROUTES.STUDENT_DASHBOARD);
        break;
      case USER_ROLES.INSTRUCTOR:
        navigate(ROUTES.INSTRUCTOR_DASHBOARD);
        break;
      case USER_ROLES.FACULTY_ADVISOR:
        navigate(ROUTES.FACULTY_DASHBOARD);
        break;
      default:
        navigate(ROUTES.HOME);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      
      {/* LEFT SIDE (Background Image Panel) */}
      <div
        className="hidden md:block w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      >
        <div className="w-full h-full bg-white/10 backdrop-brightness-105"></div>
      </div>

      {/* RIGHT SIDE (Auth Panel) */}

        {
            step == "email" && (
                <EmailInput 
                    email={email}
                    setEmail={setEmail}
                    handleSubmit={(e) => handleSubmit(e , "email")}
                />
            )
        }
        {
            step == "otp" && (
                <OTPInput
                    email={email}
                    handleBack={() => setStep("email")}
                    handleVerify={(otp) => console.log("verify OTP:", otp)}
                    
                
                />
            )
        }
    </div>
  );
}
