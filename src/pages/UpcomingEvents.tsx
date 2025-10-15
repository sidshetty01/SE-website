import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RecruitmentForm, WorkshopForm } from "@/components/SimpleRegistrationForms";
import React from "react";

const UpcomingEvents: React.FC = () => {
  const upcomingEvents = [
    {
      date: "Oct 2025",
      title: "Lift-Off Workshop",
      description:
        "Join us for a dynamic hands-on aeromodelling experience on 25th October 2025 at 2:00 PM in the Mech Seminar Hall (New Building), where first and second-year students will get the opportunity to learn the fundamentals of flight, build and test their own model aircraft, and experience the thrill of flying RC planes with live demonstrations. Participants will receive certificates, stand a chance to win prizes worth up to ₹5000, and engage in an exciting, team-based environment (up to 4 members per team). The registration fee is ₹400 per team—don’t miss this interactive event that brings the science of aerodynamics to life.",
      icon: undefined,
    },
    {
      date: "Nov 2025",
      title: "Recruitments 2025-26",
      description:
        "Recruitments for Team Soaring Eagles are open exclusively for first- and second-year students, offering them a chance to learn, build, and compete in drones and aerial robotics as part of an innovative team.",
      icon: undefined,
    },
   
  ];

  return (
    <div className="min-h-screen py-12 px-2 lg:px-4">
      <div className="container mx-auto px-2 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-3 glow-primary">Upcoming Events</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A look at what's coming next for Soaring Eagles
          </p>
        </motion.div>

          <div className="relative">
          {/* vertical line + emblem hidden on small screens */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-2 sm:pl-10 lg:pl-20"
              >
                  {/* emblem shown only on small+ screens */}
                  <div className="hidden sm:absolute sm:left-0 sm:flex sm:items-center sm:justify-center">
                    <div className="w-10 h-10 rounded-full bg-background/60 border border-primary/30 shadow-glow-strong overflow-hidden">
                      <img src="/images/club_logo.png" alt="SE Emblem" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="card-glow p-3 sm:p-5 rounded-xl glass group cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xl sm:text-3xl font-bold text-gradient">{event.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 text-sm sm:text-base">{event.description}</p>

                  {/* Add registration buttons for specific events */}
                  {event.title === "Lift-Off Workshop" && <WorkshopForm />}
                  {event.title === "Recruitments 2025-26" && <RecruitmentForm />}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute left-8 -bottom-8 w-16 h-16 rounded-full bg-primary blur-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
