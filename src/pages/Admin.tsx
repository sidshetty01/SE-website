import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ComprehensiveAdminPanel from '@/components/ComprehensiveAdminPanel';

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Header with User Info and Logout */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1"></div>
            <h1 className="text-5xl font-bold glow-primary flex-1">Admin Panel</h1>
            <div className="flex-1 flex justify-end items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-lg border border-primary/20">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Secure access to manage club content and view registrations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full min-h-[80vh] bg-background/80 backdrop-blur-sm rounded-xl border border-primary/20 shadow-2xl overflow-hidden"
        >
          <div className="p-4">
            <ComprehensiveAdminPanel />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
