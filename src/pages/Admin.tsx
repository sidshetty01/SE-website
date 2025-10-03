import React from 'react';
import { motion } from 'framer-motion';
import ComprehensiveAdminPanel from '@/components/ComprehensiveAdminPanel';

const Admin = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-3 glow-primary">Admin Panel</h1>
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
