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
        "This workshop, for first- and second-year students, includes an introductory tech talk, glider making, flight practice, and a quiz, providing both foundational knowledge and hands-on experience in drones and aerial robotics.",
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
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
          <div className="space-y-12">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                <div className="absolute left-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-background/60 border border-primary/30 shadow-glow-strong overflow-hidden">
                    <img src="/images/club_logo.png" alt="SE Emblem" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="card-glow p-6 rounded-xl glass group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl font-bold text-gradient">{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>

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
