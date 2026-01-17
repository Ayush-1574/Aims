import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterStudent({ email, onComplete, onBack }) {
    const[name , setName ] = useState("")
  const [entryNo, setEntryNo] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onComplete("student")
    
    return
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: "student",
          data: { entryNo, gender, department }
        })
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.message || "Signup failed");
        return;
      }

      // store token
      localStorage.setItem("token", json.token);

      onComplete(json.role); // callback to auth page for redirect

    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-10 box-border">
      <button onClick={onBack} className="mb-6 text-white">← Back</button>

      <h1 className="text-3xl font-semibold mb-4">Student Registration</h1>
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
          placeholder="Entry Number"
          className="border p-2 w-full"
          value={entryNo}
          onChange={(e) => setEntryNo(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

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
