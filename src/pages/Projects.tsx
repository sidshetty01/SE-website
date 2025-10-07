import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
    title: "Netra 2025",
    description: "This H-frame quadcopter was developed for autonomous aerial scanning missions.It features a Raspberry Pi 5 for onboard image processing and a Pixhawk flight controller for stable autonomous navigation.The drone can take off, perform scans, and land autonomously within a geofenced area.Built for precision and reliability, it’s ideal for mapping, inspection, and disaster assessment applications.",
    image: "/images/projNetra.jpg",
    tags: ["Quadcopter", "Autonomous", "AerialScanning"],
  },
   {
    title: "Vitrak 2025",
    description: "This X-frame quadcopter is designed for autonomous payload delivery using GPS navigation.Equipped with a Pixhawk controller and onboard sensors, it can take off, fly to a target location, and deliver payloads with high accuracy.A Raspberry Pi module handles mission logic and communication.The system ensures fully automated operation from launch to safe return, ideal for disaster relief and logistics tasks.",
    image: "/images/projVitrak.jpg",
    tags: ["Quadcopter", "Autonomous", "PayloadDelivery"],
  },
  {
   title: "Gajraj 2024",
   description: "This fixed-wing RC plane was built for a prestigious TechFest competition at IIT Bombay, where our team proudly secured the 10th rank among 250+ teams.Designed for high lift, stability, and efficient flight performance, it excelled in both endurance and payload missions.The aircraft was entirely student-designed and fabricated, showcasing innovation in aerodynamics and control.It stands as a testament to our team’s engineering excellence and dedication to aeromodelling.",
   image: "/images/ProjGajraj2024.jpg",
   tags: ["IITBombay", "Techfest", "FixedWing"],
 },
 {
   title: "Prayas-2024",
   description: "This trainer RC plane was built to teach freshers of 2024–25 the basics of aerodynamics and maneuverability.Lightweight and stable, it helps beginners understand lift, drag, and control response through hands-on flying.The project aims to build foundational skills in aeromodelling and UAV design.",
   image: "/images/projPrayas.jpg",
   tags: ["Aerodynamics", "Freshers", "Maneuverability"],
  },
  
  {
    title: "Abhyas 2024",
    description: "This RC plane was built by our team for the Wright Flight competition at TechFest NITK 2024.Designed and fabricated from scratch, it focused on aerodynamic efficiency and payload stability.The model showcased precise control, endurance, and innovative design.It marked a proud achievement for our Soaring Eagles Aeromodelling Team.",
    image: "/images/projAbhyas.jpg",
    tags: ["FixedWing", "Aerodynamics", "Competition"],
  },
    {
      title: "Ornithopter 2021",
      description: "A bird-like flying machine that flaps its wings to generate lift and thrust.It was built in 2021 as part of an experimental aero-design project focused on biomimetic flight.The structure uses lightweight materials such as carbon fiber and thin polymer film for efficient flapping.Its motion is powered by a compact servo-motor mechanism controlled via remote or onboard electronics.The project demonstrates how nature-inspired flight dynamics can be applied in robotics and drone technology.",
      image: "/images/projOrnithopter.jpg",
      tags: ["BiomimeticFlight", "AeroInnovation", "AerialMechanics"],
    },
    {
      title: "Hexacopter Drone 2017",
      description: "a six-rotor unmanned aerial vehicle designed for stable and powerful flight.It was built in 2017 as part of an engineering project focusing on multirotor control and payload capacity.The drone’s carbon-fiber frame and brushless DC motors provide durability and efficient lift.Its flight is managed by an onboard flight controller system integrated with GPS and IMU sensors.This project demonstrates advancements in aerial robotics and autonomous flight technology.",
      image: "/images/ProjHexacopter2017.jpg",
      tags: ["Telemetry", "GPS", "StableFlight"],
    },
    {
      title: "Fixed wing RC Plane-MANOVE-GAM-2017",
      description: "This image shows a fixed-wing RC aircraft developed during the Manove Gam workshop in 2017.It features a monoplane design with a lightweight fuselage and a front-mounted propeller for efficient thrust.The aircraft was built to study aerodynamic stability, lift generation, and control surface dynamics.Constructed using balsa wood and composite materials, it balances strength with minimal weight.This project marked an important step in hands-on aeromodelling and flight mechanics training for participants.",
      image: "/images/proj2017ManoveGam.jpg",
    tags: ["Workshop", "FixedWing", "Aeodynamics"],
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
                {/* View Details removed per request */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
