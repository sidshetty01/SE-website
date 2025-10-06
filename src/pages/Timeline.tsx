import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruitmentForm, WorkshopForm } from "@/components/SimpleRegistrationForms";
import seEmblem from "../../image (2) (1).png";

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2025",
      title: "SAEINDIA ADDC workshop Phase 1– SRM Chennai ",
      description: " Autonomous Drone Development Challenge (ADDC) Workshop (SAEINDIA ISS) – SRM Chennai (15–16 August 2025). Our team assembled, configured, and successfully flew a drone from scratch, gaining practical experience with Pixhawk flight controllers, autonomous mission planning, and UAV systems integration.",
      image: "/images/2025ADDC.jpeg",
    },
    {
      year: "2025",
      title: "SAEINDIA DDC Workshop P1 -NSS College of Engineering, Palakkad  ",
      description: "Drone Development Challenge (DDC) Workshop 2025 – NSS College of Engineering, Palakkad (organized by SAEINDIA Southern Section). Our team, Soaring Eagles, designed, built, and successfully flew a fixed-wing UAV, gaining hands-on experience in aerodynamics, electronics, and UAV applications.",
      image: "/images/2025DDC.jpeg",
    },
    {
      year: "2019",
      title: "SAEISS Aero Design Challenge-SRM IST, Chennai ",
      description: "Secured 33rd rank in a national UAV competition featuring 144 teams. We participated in the micro class, where the challenge was to design a fixed-wing UAV capable of lifting maximum payload within strict size and weight limits. Aircraft were judged on design, innovation, and flight performance.",
      image: "/images/2019ADDC.jpeg",
    },
    {
      year: "2025",
      title: "SAEINDIA AEROTHON – GAT, Bengaluru ",
      description: "In this initial stage, we submitted a comprehensive UAV design report covering aerodynamics, mission planning, and subsystem integration. Our team was appreciated for its innovative design approach, structural analysis, and detailed payload delivery strategy.",
      image: "/images/2025Aerothon.jpg",
    },
    {
      year: "2024",
      title: "Boeing National Aero Modelling Competition-IITB",
      description: "Two teams from our club designed and fabricated a fixed-wing UAV focused on payload capacity and precision delivery. We successfully demonstrated heavy-payload handling and secured 10th and 15th place among 250+ teams.",
      image: "/images/2024IITB.jpeg",
    },
    {
      year: "2024",
      title: "Wright Flight – NIT Surathkal, Karnataka ",
      description: "A competition on the design and fabrication of fixed-wing UAVs capable of aerobatic maneuvers and payload transport. Our team successfully demonstrated the UAV’s stability and maneuverability in outdoor conditions and completed all mission checkpoints within the allotted time.",
      image: "/images/2024WrightFlight.jpeg",
    },
    {
      year: "2023",
      title: "SAEINDIA Aerothon-GAT, Bengaluru",
      description: "Our team ranked 11th among 150+ teams. The competition emphasized end-to-end design, build, and piloting of an Uncrewed Aircraft System (UAS) to meet specific mission requirements, culminating in a final fly-off.",
      image: "/images/2023Aerothon.jpeg",
    },
    {
      year: "2020",
      title: "International Rank 23rd in SAE Aero Design 2020, Texas, USA",
      description: "Competed in SAE International’s premier student aerospace competition, where teams design, fabricate, and demonstrate the flight performance of a radio-controlled aircraft. The challenge focused on optimizing lift, payload efficiency, and flight endurance under specific design and mission constraints.",
      image: "/images/2020International.jpeg",
    },
    {
      year: "2019",
      title: "Autonomous Drone Hackathon-IITK ",
      description: "Finalist at the International Multi-Rotor Challenge, Techkriti ’19, IIT Kanpur — a prestigious drone design and flying competition showcasing autonomous flight, stability control, and mission-based aerial tasks among top teams from across the country.",
      image: "/images/2019IITK.jpeg",
    },
    {
      year: "2017",
      title: "MANOVE-GAM-17 -Bangalore",
      description: "The MANOVEGAM event in 2017 refers to the SAE International Student Section (SAE ISS) Aero Design Challenge, a competition aimed at undergraduate engineering students to design and build lightweight unmanned air vehicles (UAVs).",
      image: "/images/2017MANovegam.jpeg",
    },
    {
      year: "2017",
      title: "International Rank 12th in SAE Aero Design (West) 2017, Van Nuys, California, USA",
      description: "Participated in an international student aircraft design competition organized by SAE International, focused on designing, building, and flight-testing a remote-controlled aircraft to achieve optimal payload capacity, aerodynamic efficiency, and flight stability under strict design constraints.",
      image: "/images/2017International.jpeg",
    },
  ];
  
  const upcomingEvents = [
    {
      date: "Oct 2025",
      title: "Lift-Off Workshop",
      description: "This workshop, for first- and second-year students, includes an introductory tech talk, glider making, flight practice, and a quiz, providing both foundational knowledge and hands-on experience in drones and aerial robotics.",
      icon: undefined,
    },
    {
      date: "Nov 2025",
      title: "Recruitments 2025-26",
      description: "Recruitments for Team Soaring Eagles are open exclusively for first- and second-year students, offering them a chance to learn, build, and compete in drones and aerial robotics as part of an innovative team.",
      icon: undefined,
    },
    {
      date: "Jan 2026",
      title: "Autonomous Drone Development & Control (ADDC) WorkshopSecond phase",
      description: "ADDC (Autonomous Drone Development & Control) is a workshop focused on building and programming drones for autonomous navigation and control, enhancing practical skills in aerial robotics.",
      icon: undefined,
    },
    {
      date: "Jan 2026",
      title: " Drone Development Challenge 2025-26 Second Phase",
      description: "DDC (Drone Development Challenge) is a competition where participants design, build, and operate drones, testing skills in innovation, engineering, and aerial problem-solving.",
      icon: undefined,
    },
    {
      date: "Jan 2026",
      title: "NIDAR Final Round",
      description: "NIDAR is a national-level drone innovation and research competition that challenges students to design, build, and showcase advanced drone technologies. It fosters creativity, teamwork, and problem-solving in real-world aerial robotics applications.",
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
          <h1 className="text-5xl font-bold mb-3 glow-primary">Timeline</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A look at where we've been and what's coming next
          </p>
        </motion.div>

  <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-10">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="journey">Our Journey</TabsTrigger>
          </TabsList>
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
          </TabsContent>
          <TabsContent value="journey">
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timeline;
