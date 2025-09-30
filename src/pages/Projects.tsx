import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Autonomous Racing Drone",
      description: "High-speed FPV racing drone with autonomous navigation capabilities. Features advanced computer vision for obstacle detection and path planning. Achieved top speeds of 120+ km/h while maintaining stable flight control.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
      tags: ["Computer Vision", "FPV", "Autonomous"],
    },
    {
      title: "Long-Range RC Plane",
      description: "Custom-built RC plane with extended flight range and endurance. Equipped with telemetry systems for real-time data monitoring. Successfully completed 50+ km autonomous missions with precise GPS waypoint navigation.",
      image: "https://images.unsplash.com/photo-1583992604394-47f3728be5e8?w=800&h=600&fit=crop",
      tags: ["Telemetry", "GPS", "Long-Range"],
    },
    {
      title: "Cargo Delivery Drone",
      description: "Heavy-lift quadcopter designed for precision cargo delivery. Features automated landing systems and package handling mechanisms. Successfully delivered payloads up to 5kg with 99% accuracy.",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=600&fit=crop",
      tags: ["Heavy Lift", "Automation", "Commercial"],
    },
    {
      title: "Aerial Photography Platform",
      description: "Stabilized camera drone for professional aerial photography and videography. Custom gimbal system ensures smooth 4K footage. Used in multiple commercial shoots and documentaries.",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=600&fit=crop",
      tags: ["Photography", "Gimbal", "4K"],
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 glow-primary">Our Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Innovative aerial robotics projects that push the boundaries of technology
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <div className="relative group overflow-hidden rounded-xl card-glow">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 space-y-4">
                <motion.h2
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gradient"
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground text-lg"
                >
                  {project.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4 pt-4"
                >
                  <Button variant="hero" className="group">
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline-hero">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
