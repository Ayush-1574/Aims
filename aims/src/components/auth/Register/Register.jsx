import RegisterStudentForm from "./RegisterStudent";
import RegisterInstructorForm from "./RegisterInstructor";

export default function Register({ email, roleHint, onComplete, onBack }) {

  // frontend role resolution based on backend hint
  const role = roleHint || "student";

  if (role === "student") {
    return (
      <RegisterStudentForm email={email} onComplete={onComplete} onBack={onBack}  />
    );
  }

  return (
    <RegisterInstructorForm email={email} onComplete={onComplete} onBack={onBack} />
  );
}
