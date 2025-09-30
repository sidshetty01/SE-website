import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { send } from "@emailjs/browser";

type MemberProfile = {
  id: string;
  name: string;
  email: string;
  role: "Avionics" | "Automation" | "Mechanical";
  twitterId?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  passwordHash: string;
};

const ADMIN_EMAIL = "sidshettyedu@gmail.com";
const ADMIN_DEFAULT_PASSWORD = "Siddith@40238";
const AVATAR_SEEDS = Array.from({ length: 20 }, (_, i) => `Eagle-${i + 1}`);
const makeAvatarUrl = (seed: string) => `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1e293b,0b132b,14213d`;

const Auth = () => {
  const { toast } = useToast();
  const [activeMember, setActiveMember] = useState<MemberProfile | null>(() => {
    const raw = localStorage.getItem("se.activeMember");
    return raw ? (JSON.parse(raw) as MemberProfile) : null;
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    role: "Avionics" as "Avionics" | "Automation" | "Mechanical",
    twitterId: "",
    linkedinUrl: "",
    password: "",
    confirmPassword: "",
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [pendingOtp, setPendingOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [pendingMemberDraft, setPendingMemberDraft] = useState<Omit<MemberProfile, "id" | "isAdmin"> | null>(null);

  const members: MemberProfile[] = useMemo(() => {
    const raw = localStorage.getItem("se.members");
    return raw ? (JSON.parse(raw) as MemberProfile[]) : [];
  }, [activeMember]);

  const saveMembers = (next: MemberProfile[]) => {
    localStorage.setItem("se.members", JSON.stringify(next));
  };

  const setSession = (member: MemberProfile | null) => {
    if (member) localStorage.setItem("se.activeMember", JSON.stringify(member));
    else localStorage.removeItem("se.activeMember");
    setActiveMember(member);
  };

  const sha256 = async (text: string) => {
    const enc = new TextEncoder();
    const data = enc.encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const sendOtpEmail = async (email: string, otp: string) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (serviceId && templateId && publicKey) {
      try {
        await send(serviceId, templateId, { to_email: email, otp }, { publicKey });
        toast({ title: "OTP sent", description: "Please check your email inbox." });
      } catch (err) {
        toast({ title: "Failed to send OTP", description: "Check EmailJS config.", variant: "destructive" });
      }
    } else {
      toast({ title: "Dev mode OTP", description: `Use OTP: ${otp}` });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const email = registerData.email.trim().toLowerCase();
    if (!email) {
      toast({ title: "Email required", variant: "destructive" });
      return;
    }
    const exists = members.find((m) => m.email.toLowerCase() === email);
    if (exists) {
      toast({ title: "Member already exists", description: "Try logging in instead." });
      return;
    }
    if (!registerData.password || registerData.password.length < 6) {
      toast({ title: "Weak password", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    const draft: Omit<MemberProfile, "id" | "isAdmin"> = {
      name: registerData.name.trim(),
      email,
      role: registerData.role,
      twitterId: registerData.twitterId.trim() || undefined,
      linkedinUrl: registerData.linkedinUrl.trim() || undefined,
      avatarUrl: makeAvatarUrl(AVATAR_SEEDS[Math.floor(Math.random() * AVATAR_SEEDS.length)]),
      passwordHash: "",
    };
    setPendingMemberDraft(draft);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingOtp(otp);
    void sendOtpEmail(email, otp);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    let member = members.find((m) => m.email.toLowerCase() === email);

    // Admin backdoor: allow fixed password and autocreate admin if missing
    if (email === ADMIN_EMAIL) {
      const hashDefault = await sha256(ADMIN_DEFAULT_PASSWORD);
      const hashEntered = await sha256(loginPassword);
      if (!member && hashEntered === hashDefault) {
        const newAdmin: MemberProfile = {
          id: crypto.randomUUID(),
          name: "Admin",
          email: ADMIN_EMAIL,
          role: "Automation",
          avatarUrl: makeAvatarUrl(AVATAR_SEEDS[Math.floor(Math.random() * AVATAR_SEEDS.length)]),
          isAdmin: true,
          passwordHash: hashDefault,
        };
        const next = [...members, newAdmin];
        saveMembers(next);
        member = newAdmin;
      }
      // If member exists, accept either stored password or the admin default
      if (member) {
        const hashEntered2 = hashEntered;
        if (member.passwordHash !== hashEntered2 && member.passwordHash !== hashDefault) {
          toast({ title: "Invalid credentials", variant: "destructive" });
          return;
        }
        setSession(member);
        toast({ title: "Signed in", description: `Welcome back, ${member.name || "member"}!` });
        return;
      }
    }

    if (!member) {
      toast({ title: "Not found", description: "Please register first.", variant: "destructive" });
      return;
    }
    const hash = await sha256(loginPassword);
    if (member.passwordHash !== hash) {
      toast({ title: "Invalid credentials", variant: "destructive" });
      return;
    }
    setSession(member);
    toast({ title: "Signed in", description: `Welcome back, ${member.name || "member"}!` });
  };

  const handleAvatarPick = (seed: string) => {
    if (!activeMember) return;
    const updated = { ...activeMember, avatarUrl: makeAvatarUrl(seed) };
    const next = members.map((m) => (m.id === updated.id ? updated : m));
    saveMembers(next);
    setSession(updated);
  };

  const handleLogout = () => setSession(null);

  const handleToggleAdmin = (memberId: string) => {
    if (!activeMember?.isAdmin) return;
    const next = members.map((m) => (m.id === memberId ? { ...m, isAdmin: !m.isAdmin } : m));
    saveMembers(next);
    if (activeMember.id === memberId) setSession({ ...activeMember, isAdmin: !activeMember.isAdmin });
    toast({ title: "Updated", description: "Member admin status changed." });
  };

  if (activeMember) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={activeMember.avatarUrl} alt="avatar" className="w-16 h-16 rounded-xl bg-muted border" />
            <div>
              <h2 className="text-2xl font-bold">Hello, {activeMember.name || activeMember.email}</h2>
              <p className="text-muted-foreground text-sm">Role: {activeMember.role || "Member"}{activeMember.isAdmin ? " • Admin" : ""}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>Log out</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-glow p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50">
            <h3 className="font-semibold mb-4">Pick your avatar</h3>
            <div className="grid grid-cols-5 gap-3">
              {AVATAR_SEEDS.map((seed) => (
                <button key={seed} onClick={() => handleAvatarPick(seed)} className={`rounded-lg border hover:shadow-hover transition-all overflow-hidden ${activeMember.avatarUrl === makeAvatarUrl(seed) ? "ring-2 ring-primary" : ""}`}>
                  <img src={makeAvatarUrl(seed)} alt={seed} className="w-full h-16 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {activeMember.isAdmin && (
            <div className="card-glow p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50">
              <h3 className="font-semibold mb-4">Admin: Members</h3>
              <div className="space-y-3 max-h-80 overflow-auto pr-1">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/40">
                    <img src={m.avatarUrl} alt="avatar" className="w-10 h-10 rounded-md bg-muted border" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{m.name || m.email}</div>
                      <div className="text-xs text-muted-foreground truncate">{m.role || "Member"}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleToggleAdmin(m.id)}>
                      {m.isAdmin ? "Revoke Admin" : "Make Admin"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-xl">
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-primary">Members Portal</h1>
          <p className="text-muted-foreground">Who am I in this club? Create your member profile with role and socials, then sign in to get your avatar.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="card-glow p-8 rounded-xl glass space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium mb-2">Email</label>
                  <Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="your.email@example.com" required className="bg-background/50" />
                </div>
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
                  <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" required className="bg-background/50" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">Sign In</Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              {!pendingOtp && (
                <form onSubmit={handleRegister} className="card-glow p-8 rounded-xl glass space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-name" className="block text-sm font-medium mb-2">Full Name</label>
                      <Input id="reg-name" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} placeholder="John Doe" required className="bg-background/50" />
                    </div>
                    <div>
                      <label htmlFor="reg-role" className="block text-sm font-medium mb-2">Role</label>
                      <select id="reg-role" value={registerData.role} onChange={(e) => setRegisterData({ ...registerData, role: e.target.value as typeof registerData.role })} className="w-full h-10 rounded-md border bg-background/50 px-3 text-sm">
                        <option value="Avionics">Avionics</option>
                        <option value="Automation">Automation</option>
                        <option value="Mechanical">Mechanical</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="reg-email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="reg-email" type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} placeholder="your.email@example.com" required className="bg-background/50" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-password" className="block text-sm font-medium mb-2">Password</label>
                      <Input id="reg-password" type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} placeholder="••••••••" required className="bg-background/50" />
                    </div>
                    <div>
                      <label htmlFor="reg-confirm" className="block text-sm font-medium mb-2">Confirm Password</label>
                      <Input id="reg-confirm" type="password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} placeholder="••••••••" required className="bg-background/50" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-twitter" className="block text-sm font-medium mb-2">Twitter ID (optional)</label>
                      <Input id="reg-twitter" value={registerData.twitterId} onChange={(e) => setRegisterData({ ...registerData, twitterId: e.target.value })} placeholder="@username" className="bg-background/50" />
                    </div>
                    <div>
                      <label htmlFor="reg-linkedin" className="block text-sm font-medium mb-2">LinkedIn URL (optional)</label>
                      <Input id="reg-linkedin" value={registerData.linkedinUrl} onChange={(e) => setRegisterData({ ...registerData, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/you" className="bg-background/50" />
                    </div>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">Send OTP</Button>
                </form>
              )}
              {pendingOtp && pendingMemberDraft && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (enteredOtp !== pendingOtp) {
                      toast({ title: "Invalid OTP", variant: "destructive" });
                      return;
                    }
                    const passwordHash = await sha256(registerData.password);
                    const newMember: MemberProfile = {
                      id: crypto.randomUUID(),
                      ...pendingMemberDraft,
                      passwordHash,
                      isAdmin: pendingMemberDraft.email.toLowerCase() === ADMIN_EMAIL,
                    };
                    const next = [...members, newMember];
                    saveMembers(next);
                    setSession(newMember);
                    setPendingOtp(null);
                    setPendingMemberDraft(null);
                    setEnteredOtp("");
                    toast({ title: "Verified", description: "Account created successfully." });
                  }}
                  className="card-glow p-8 rounded-xl glass space-y-6"
                >
                  <p className="text-sm text-muted-foreground">We sent a 6-digit OTP to <span className="font-medium">{pendingMemberDraft.email}</span>. Enter it below to verify your email.</p>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium mb-2">OTP</label>
                    <Input id="otp" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} placeholder="123456" maxLength={6} required className="bg-background/50 tracking-widest" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button type="submit" variant="hero" className="flex-1">Verify & Create Account</Button>
                    <Button type="button" variant="outline" onClick={() => { if (pendingMemberDraft) void sendOtpEmail(pendingMemberDraft.email, pendingOtp); }}>Resend OTP</Button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
