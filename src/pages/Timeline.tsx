import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import seEmblem from "../../image (2) (1).png";

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2024",
      title: "National Championship Victory",
      description: "Won first place at the National Aerial Robotics Competition with our autonomous racing drone, setting a new speed record.",
      icon: undefined,
    },
    {
      year: "2023",
      title: "Long-Range Mission Success",
      description: "Successfully completed a 50km autonomous flight mission, demonstrating advanced GPS navigation and telemetry systems.",
      icon: undefined,
    },
    {
      year: "2022",
      title: "Club Expansion",
      description: "Doubled our membership to 50+ active members and established partnerships with three industry sponsors.",
      icon: undefined,
    },
    {
      year: "2021",
      title: "Regional Competition Win",
      description: "Secured first place in the Regional Drone Racing League, qualifying for national championships.",
      icon: undefined,
    },
    {
      year: "2020",
      title: "Innovation Lab Launch",
      description: "Inaugurated our dedicated workshop and testing facility with state-of-the-art equipment and tools.",
      icon: undefined,
    },
    {
      year: "2011",
      title: "Club Foundation",
      description: "Soaring Eagles Aerial Robotics Club was officially founded with a vision to push the boundaries of RC Plane technology.",
      icon: undefined,
    },
  ];

  const upcomingEvents = [
    {
      date: "Nov 2025",
      title: "Inter-College RC Plane Showcase",
      description: "Open fly day and static display of our latest RC planes and drones.",
      icon: undefined,
    },
    {
      date: "Dec 2025",
      title: "Winter Build Camp",
      description: "Hands-on 2-week camp to onboard new members and build trainer aircraft.",
      icon: undefined,
    },
    {
      date: "Jan 2026",
      title: "Field Trials",
      description: "Full-day testing of navigation and telemetry at the airstrip (weather permitting).",
      icon: undefined,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-3 glow-primary">Timeline</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A look at where we've been and what's coming next
          </p>
        </motion.div>

        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-10">
            <TabsTrigger value="journey">Our Journey</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          </TabsList>

          <TabsContent value="journey">
            <div className="relative">
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
                    <div className="absolute left-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background/60 border border-primary/30 shadow-glow-strong overflow-hidden">
                        <img src={seEmblem} alt="SE Emblem" className="w-full h-full object-cover" />
                      </div>
                    </div>

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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="absolute left-8 -bottom-8 w-16 h-16 rounded-full bg-primary blur-2xl"
              />
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
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
                        <img src={seEmblem} alt="SE Emblem" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="card-glow p-6 rounded-xl glass group cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl font-bold text-gradient">{event.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground">{event.description}</p>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timeline;
