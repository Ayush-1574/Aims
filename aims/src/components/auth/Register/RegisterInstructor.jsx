import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterInstructor({ email, onComplete, onBack  }) {
    const[name , setName ] = useState("")
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: "instructor",
          data: { department }
        })
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.message || "Signup failed");
        return;
      }

      localStorage.setItem("token", json.token);
      onComplete(json.role);

    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-10 box-border">
      <button onClick={onBack} className="mb-6 text-black">← Back</button>

      <h1 className="text-3xl font-semibold mb-4">Instructor Registration</h1>
      <p className="text-gray-600 mb-6">{email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input 
            type="text"
            className="border p-2 w-full" 
            value = {name}
            placeholder="Name"
            onChange = {(e) => setName(e.target.value)}
            required

        
        />

        <Input
          placeholder="Department (e.g. CSE)"
          className="border p-2 w-full"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <Button disabled={loading} type="submit" className="w-full bg-black text-white">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
