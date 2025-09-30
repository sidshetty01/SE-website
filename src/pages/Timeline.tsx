import { motion } from "framer-motion";
import { Trophy, Rocket, Users, Award, Lightbulb, Target } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2024",
      title: "National Championship Victory",
      description: "Won first place at the National Aerial Robotics Competition with our autonomous racing drone, setting a new speed record.",
      icon: Trophy,
    },
    {
      year: "2023",
      title: "Long-Range Mission Success",
      description: "Successfully completed a 50km autonomous flight mission, demonstrating advanced GPS navigation and telemetry systems.",
      icon: Rocket,
    },
    {
      year: "2022",
      title: "Club Expansion",
      description: "Doubled our membership to 50+ active members and established partnerships with three industry sponsors.",
      icon: Users,
    },
    {
      year: "2021",
      title: "Regional Competition Win",
      description: "Secured first place in the Regional Drone Racing League, qualifying for national championships.",
      icon: Award,
    },
    {
      year: "2020",
      title: "Innovation Lab Launch",
      description: "Inaugurated our dedicated workshop and testing facility with state-of-the-art equipment and tools.",
      icon: Lightbulb,
    },
    {
      year: "2019",
      title: "Club Foundation",
      description: "Soaring Eagles Aerial Robotics Club was officially founded with a vision to push the boundaries of drone technology.",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 glow-primary">Our Journey</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of achievements, milestones, and honors that define our legacy
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                {/* Icon Badge */}
                <div className="absolute left-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-strong animate-pulse-glow">
                    <event.icon className="h-8 w-8 text-background" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="card-glow p-6 rounded-xl glass group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl font-bold text-gradient">{event.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Glow */}
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

export default Timeline;
