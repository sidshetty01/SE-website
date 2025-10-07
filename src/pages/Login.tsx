import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Loader2 } from "lucide-react";
import { getAllMembers, type TeamMember } from "@/data/team";

const Login = () => {
  const allMembers = useMemo(() => getAllMembers(), []);
  const [userType, setUserType] = useState("admin")
  const [email, setEmail] = useState("");
  const [found, setFound] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful! 🎉",
          description: "Redirecting to admin panel...",
        });
        navigate("/admin", { replace: true });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

        {userType === "admin" && (
          <Card className="w-full max-w-md mt-6 mx-auto">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter the email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Session will remain active for 2 hours</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;


