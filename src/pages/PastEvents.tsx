import { motion } from "framer-motion";
import React from "react";

const timelineEvents = [
     {
    year: "2025",
    title: "Lift-Off Workshop",
    venue: "SIT, Tumkur, Karnataka",
    date: "22 October 2025",
    about:
      "A hands-on workshop organized by Soaring Eagles aimed at introducing 1st and 2nd-year students to the fundamentals of aerodynamics and RC plane design. The session included an engaging quiz on basic aerospace concepts followed by a practical activity where participants built and flight-tested their own gliders.",
    outcome:
    "Helped students gain a foundational understanding of flight mechanics and teamwork while sparking interest in aerial robotics through an interactive and enjoyable learning experience.",
  image: "/images/liftoff.png",
    description: undefined,
  },
  {
    year: "2025",
    title: "Technical Presentation in association with IIC SIT",
    venue: "SIT, Tumkur, Karnataka",
    date: "13 May 2025",
    about:
      "A technical presentation organized by the Institution’s Innovation Council (IIC) at SIT on the occasion of Innovation Day, aimed at sharing innovative student projects with IIC members and faculty.",
    outcome:
      "Presented the design, development, and applications of our UAV project to IIC members, receiving valuable feedback and appreciation for its innovation and technical depth.",
    image: "/images/pastIIC.png",
    description: undefined,
  },
  {
    year: "2025",
    title: " Siddaganga Agricultural and Industrial Exhibition ",
    venue: "Siddaganga Math, Tumkur, Karnataka",
    date: " 17th February 2025- 3rd march 2025 ",
    about:
      " A public exhibition showcasing innovations in agriculture and industry. ",
    outcome:
      "Presented our UAV project to a wide audience, demonstrating its applications in precision farming and aerial surveying.Appreciated by visitors and organizers for promoting tech-driven agricultural solutions.",
    image: "/images/pastMutt.png",
    description: undefined,
  },
  {
    year: "2024",
    title: " SAE Collegiate Meet ",
    venue: " SIT, Tumkur, Karnataka. ",
    date: " 06th November 2024 ",
    about:
      " The SAE Collegiate Meet is an exciting introductory session where freshers are welcomed into the world of SAE and its collegiate clubs. We’ll explore what SAE is, how our clubs function through hands on projects and competitions, and why joining opens doors to practical engineering, industry exposure, and national-level events. It's the perfect launchpad for innovation, teamwork, and career-building from day one .",
    outcome:
      "By the end of the SAE Collegiate Meet, freshers will gain a clear understanding of SAE's mission, club structure, and opportunities. They'll be equipped to choose a technical domain that matches their interests and take their first step toward industry-oriented learning and innovation.",
    image: "/images/pastCollegiate.png",
    description: undefined,
  },
];

const PastEvents: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
              <h1 className="text-4xl font-bold mb-3 glow-primary">Past Events</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A gallery of events we've completed
          </p>
        </motion.div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <React.Fragment key={event.year + index}>
              <motion.div
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
                      className="mx-auto block max-w-full h-auto object-contain transition-transform duration-500"
                      style={{ width: 'auto', maxWidth: '100%' }}
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
                    className="text-xl lg:text-2xl font-bold text-gradient"
                  >
                    {event.year}: {event.title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground text-sm lg:text-base space-y-2"
                  >
                    {event.venue && (
                      <p>
                        <span className="font-semibold">Venue:</span> {event.venue}
                      </p>
                    )}
                    {event.date && (
                      <p>
                        <span className="font-semibold">Date:</span> {event.date}
                      </p>
                    )}
                    {event.about && (
                      <p>
                        <span className="font-semibold">About:</span> {event.about}
                      </p>
                    )}
                    {event.outcome && (
                      <p>
                        <span className="font-semibold">Outcome:</span> {event.outcome}
                      </p>
                    )}
                    {!event.about && !event.outcome && event.description && (
                      <p>{event.description}</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
              {/* separator between items */}
              {index !== timelineEvents.length - 1 && (
                <div className="w-full flex justify-center">
                  <div className="w-11/12 h-px bg-muted-foreground/30 my-4" />
                </div>
              )}
            </React.Fragment>
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

export default PastEvents;
