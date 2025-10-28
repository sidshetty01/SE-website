import React from "react";
import { motion } from "framer-motion";
import { RecruitmentForm } from "@/components/SimpleRegistrationForms";

const JoinUs: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-3 glow-primary">Join Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill the form below to apply for recruitment.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <RecruitmentForm inline />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
