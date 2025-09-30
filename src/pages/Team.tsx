import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mock team data organized by year
  const teamByYear = {
    "4th Year": [
      { name: "Alex Chen", role: "President", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
      { name: "Sarah Johnson", role: "Vice President", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      { name: "Michael Park", role: "Technical Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
    ],
    "3rd Year": [
      { name: "Emma Wilson", role: "Operations Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
      { name: "James Lee", role: "Electronics Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
      { name: "Olivia Brown", role: "Software Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" },
    ],
    "2nd Year": [
      { name: "Daniel Martinez", role: "Build Team", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel" },
      { name: "Sophie Taylor", role: "Design Team", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" },
      { name: "Ryan Anderson", role: "Testing Team", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan" },
    ],
    "1st Year": [
      { name: "Isabella Garcia", role: "Junior Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella" },
      { name: "Ethan White", role: "Junior Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan" },
      { name: "Ava Thomas", role: "Junior Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava" },
    ],
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 glow-primary">Our Team</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the brilliant minds behind Soaring Eagles
          </p>
        </motion.div>

        {Object.entries(teamByYear).map(([year, members], yearIndex) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gradient">{year}</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="border-primary/30 hover:border-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="border-primary/30 hover:border-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {members.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <div className="card-glow p-6 rounded-xl glass group cursor-pointer h-full">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary mb-4">{member.role}</p>
                    <div className="flex gap-3">
                      <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                        <Mail className="h-4 w-4 text-primary" />
                      </button>
                      <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                        <Linkedin className="h-4 w-4 text-primary" />
                      </button>
                      <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                        <Github className="h-4 w-4 text-primary" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Team;
