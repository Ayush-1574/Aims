import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


import EmailInput from '@/components/auth/EmailInput';
import OTPInput from '@/components/auth/OtpInput';
import {USER_ROLES , ROUTES} from '@/config/constants'
import NotFound from '@/components/auth/NotFound';
import Register from "@/components/auth/Register/Register";


const mockUsers = {
  "ayushsonika1@gmail.com": { role: "student" },
  "ayushsonika1+1@gmail.com": { role: "instructor" }
};

export default function App() {
    const [step , setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [user , setUser] = useState(null);
    const [roleHint, setRoleHint] = useState(null);
    const navigate = useNavigate()





  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep("otp")
    

    // const res = await fetch("/auth/send-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email })
    // });

    // const json = await res.json();

    // if (json.success) {
    //     setStep("otp");
    // } else {
    //     // optional: show message
    //     alert(json.message || "Failed to send OTP");
    // }
};

const handleVerifyOTP = async (otp) => {
    // const res = await fetch("/auth/verify-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, otp })
    // });

    // const json = await res.json();

    // if (!json.success) {
    //     alert(json.message || "Invalid OTP");
    //     return;
    // }

    // if (json.user_exists) {
    //     // login successful
    //     localStorage.setItem("token", json.token);
    //     redirectToDashboard(json.role);
    // } else {
    //     // new user -> show register form
    //     setRoleHint(json.role_hint);
    //     setStep("register");
    // }
    if(mockUsers[email] || email == "a@gmail.com" || email == "f@gmail.com" || email=="k@gmail.com"){
        //setUser()
        if(email == "a@gmail.com") {
            redirectToDashboard("student")
        }
        else if(email == "f@gmail.com"){
            redirectToDashboard("faculty_advisor")
        }
        else if (email=="k@gmail.com"){
        redirectToDashboard("instructor")
    }

    }
    else{
        setStep("not-found")
    }
};




  const handleBack = () => {
    setStep("email");
  };

    const redirectToDashboard = (userRole) => {
        
    switch (userRole) {
      case USER_ROLES.STUDENT:
        console.log("Hi")
        navigate(ROUTES.STUDENT_DASHBOARD);
        break;
      case USER_ROLES.INSTRUCTOR:
        navigate(ROUTES.INSTRUCTOR_DASHBOARD);
        break;
      case USER_ROLES.FACULTY_ADVISOR:
        navigate(ROUTES.ADVISOR_DASHBOARD);
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
                    handleVerify={(otp) => handleVerifyOTP(otp)}
                    
                
                />
            )
        }

        {
            step == "not-found" && (
                <NotFound
                    email = {email}
                    onRegister={() => setStep("register")}
                    onBack={() => setStep("email")}
                />
            )
        }

        {
            step === "register" && (
                <Register
                    email={email}
                    roleHint={roleHint}
                    onBack={() => setStep("email")}
                    onComplete={(role) => {
                    setUser({ role });
                    setStep("redirect");
                    }}
                />
            )
        }

      


    </div>
  );
}
