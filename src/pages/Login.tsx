import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllMembers, type TeamMember } from "@/data/team";

type UserType = "member" | "student";

const Login = () => {
  const allMembers = useMemo(() => getAllMembers(), []);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [email, setEmail] = useState("");
  const [found, setFound] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFound(null);
    const match = allMembers.find((m) => m.email?.toLowerCase() === email.trim().toLowerCase());
    if (match) {
      setFound(match);
    } else {
      setError("No member found with that email.");
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-4 glow-primary">Login</h1>
          <p className="text-muted-foreground">Choose your path below</p>
        </motion.div>

        {!userType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full" variant="hero" onClick={() => setUserType("member")}>I'm a Member</Button>
            <Button className="w-full" variant="outline-hero" onClick={() => setUserType("student")}>I'm a Student</Button>
          </div>
        )}

        {userType === "member" && (
          <form onSubmit={handleLookup} className="card-glow p-6 rounded-xl glass mt-6 space-y-4">
            <label className="block text-sm font-medium">Member Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" type="email" required />
            <Button type="submit" variant="hero" className="w-full">Continue</Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        )}

        {found && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card-glow p-6 rounded-xl glass mt-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={found.image} alt={found.name} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="text-xl font-bold">{found.name}</h3>
                <p className="text-primary">{found.role}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              {found.email && <p><span className="font-semibold">Email:</span> {found.email}</p>}
              {found.linkedin && <p><span className="font-semibold">LinkedIn:</span> <a className="text-primary hover:underline" href={found.linkedin} target="_blank" rel="noreferrer">{found.linkedin}</a></p>}
              {found.twitter && <p><span className="font-semibold">X:</span> <a className="text-primary hover:underline" href={found.twitter} target="_blank" rel="noreferrer">{found.twitter}</a></p>}
            </div>
          </motion.div>
        )}

        {userType === "student" && (
          <div className="card-glow p-6 rounded-xl glass mt-6 text-center text-muted-foreground">
            Write to us at <span className="text-primary">tseofficial2011@gmail.com</span> to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;


