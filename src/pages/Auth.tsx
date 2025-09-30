import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "",
    email: "", 
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to backend API
    toast({
      title: "Login Successful",
      description: "Welcome back to Soaring Eagles!",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // TODO: Connect to backend API
    toast({
      title: "Registration Successful",
      description: "Please check your email to verify your account.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="relative">
              <Plane className="h-10 w-10 text-primary animate-float" />
              <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
          </Link>
          <h1 className="text-4xl font-bold mb-2 glow-primary">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="card-glow p-8 rounded-xl glass space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Sign In
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => toast({ title: "Password reset email sent!" })}
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="card-glow p-8 rounded-xl glass space-y-6">
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="signup-name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label htmlFor="signup-confirm" className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
