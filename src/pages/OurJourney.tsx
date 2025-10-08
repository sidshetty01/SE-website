import { motion } from "framer-motion";
import React from "react";

const timelineEvents = [
  {
    year: "2025",
    title: "SAEINDIA ADDC workshop Phase 1– SRM Chennai ",
    description:
      " Autonomous Drone Development Challenge (ADDC) Workshop (SAEINDIA ISS) – SRM Chennai (15–16 August 2025). Our team assembled, configured, and successfully flew a drone from scratch, gaining practical experience with Pixhawk flight controllers, autonomous mission planning, and UAV systems integration.",
    image: "/images/2025ADDC.jpeg",
  },
  {
    year: "2025",
    title: "SAEINDIA DDC Workshop P1 -NSS College of Engineering, Palakkad  ",
    description:
      "Drone Development Challenge (DDC) Workshop 2025 – NSS College of Engineering, Palakkad (organized by SAEINDIA Southern Section). Our team, Soaring Eagles, designed, built, and successfully flew a fixed-wing UAV, gaining hands-on experience in aerodynamics, electronics, and UAV applications.",
    image: "/images/2025DDC.jpeg",
  },
  {
    year: "2025",
    title: "SAEINDIA AEROTHON – GAT, Bengaluru ",
    description:
      "In this initial stage, we submitted a comprehensive UAV design report covering aerodynamics, mission planning, and subsystem integration. Our team was appreciated for its innovative design approach, structural analysis, and detailed payload delivery strategy.",
    image: "/images/2025Aerothon.jpg",
  },
  {
    year: "2024",
    title: "Boeing National Aero Modelling Competition-IITB",
    description:
      "Two teams from our club designed and fabricated a fixed-wing UAV focused on payload capacity and precision delivery. We successfully demonstrated heavy-payload handling and secured 10th and 15th place among 250+ teams.",
    image: "/images/2024IITB.jpeg",
  },
  {
    year: "2024",
    title: "Wright Flight – NIT Surathkal, Karnataka ",
    description:
      "A competition on the design and fabrication of fixed-wing UAVs capable of aerobatic maneuvers and payload transport. Our team successfully demonstrated the UAV’s stability and maneuverability in outdoor conditions and completed all mission checkpoints within the allotted time.",
    image: "/images/2024WrightFlight.jpeg",
  },
  {
    year: "2023",
    title: "SAEINDIA Aerothon-GAT, Bengaluru",
    description:
      "Our team ranked 11th among 150+ teams. The competition emphasized end-to-end design, build, and piloting of an Uncrewed Aircraft System (UAS) to meet specific mission requirements, culminating in a final fly-off.",
    image: "/images/2023Aerothon.jpeg",
  },
  {
    year: "2020",
    title: "International Rank 23rd in SAE Aero Design 2020, Texas, USA",
    description:
      "Competed in SAE International’s premier student aerospace competition, where teams design, fabricate, and demonstrate the flight performance of a radio-controlled aircraft. The challenge focused on optimizing lift, payload efficiency, and flight endurance under specific design and mission constraints.",
    image: "/images/2020International.jpeg",
  },
  {
    year: "2019",
    title: "SAEISS Aero Design Challenge-SRM IST, Chennai ",
    description:
      "Secured 33rd rank in a national UAV competition featuring 144 teams. We participated in the micro class, where the challenge was to design a fixed-wing UAV capable of lifting maximum payload within strict size and weight limits. Aircraft were judged on design, innovation, and flight performance.",
    image: "/images/2019ADDC.jpeg",
  },
  {
    year: "2019",
    title: "Autonomous Drone Hackathon-IITK ",
    description:
      "Finalist at the International Multi-Rotor Challenge, Techkriti ’19, IIT Kanpur — a prestigious drone design and flying competition showcasing autonomous flight, stability control, and mission-based aerial tasks among top teams from across the country.",
    image: "/images/2019IITK.jpeg",
  },
  {
    year: "2017",
    title: "MANOVE-GAM-17 -Bangalore",
    description:
      "The MANOVEGAM event in 2017 refers to the SAE International Student Section (SAE ISS) Aero Design Challenge, a competition aimed at undergraduate engineering students to design and build lightweight unmanned air vehicles (UAVs).",
    image: "/images/2017MANovegam.jpeg",
  },
  {
    year: "2017",
    title: "International Rank 12th in SAE Aero Design (West) 2017, Van Nuys, California, USA",
    description:
      "Participated in an international student aircraft design competition organized by SAE International, focused on designing, building, and flight-testing a remote-controlled aircraft to achieve optimal payload capacity, aerodynamic efficiency, and flight stability under strict design constraints.",
    image: "/images/2017International.jpeg",
  },
];

const OurJourney: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-3 glow-primary">Our Journey</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A look at where we've been and how we grew
          </p>
        </motion.div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year + index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`w-full flex flex-col lg:flex-row${index % 2 !== 0 ? '-reverse' : ''} gap-8 items-center`}
              style={{ maxWidth: '100%' }}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group overflow-hidden rounded-xl card-glow">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ maxWidth: '100%', width: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60" />
                </div>
              </div>
              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-4">
                <motion.h2
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gradient"
                >
                  {event.year}: {event.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground text-lg"
                >
                  {event.description}
                </motion.p>
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
  );
};

export default OurJourney;
