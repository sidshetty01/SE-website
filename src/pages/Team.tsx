import { Mail, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { teamByYear } from "@/data/team";
import { motion } from "framer-motion";

const Team = () => {
  const [visibleEmail, setVisibleEmail] = useState<string | null>(null);

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
          <div className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2 bg-primary/10 text-primary border border-primary/20 animate-pulse">
            <span className="text-sm font-semibold tracking-wide">Recruiting soon</span>
          </div>
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gradient">{year}</h2>
            </div>

            {members.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
                  <div className="relative px-8 py-12 text-center">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="inline-block"
                    >
                      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2 tracking-wide">
                        Recruiting Soon
                      </h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-full"
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
                        {member.email ? (
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleEmail(
                                visibleEmail === member.email ? null : member.email
                              )
                            }
                            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            title={`Show email for ${member.name}`}
                          >
                            <Mail className="h-4 w-4 text-primary" />
                          </button>
                        ) : (
                          <button
                            className="p-2 rounded-full bg-primary/5 text-muted-foreground cursor-not-allowed"
                            title="Email not available"
                            aria-disabled
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                        )}
                        <a 
                          href={member.linkedin || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="h-4 w-4 text-primary" />
                        </a>
                        <a 
                          href={member.twitter || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                          title="X (Twitter) Profile"
                        >
                          <Twitter className="h-4 w-4 text-primary" />
                        </a>
                      </div>

                      {visibleEmail === member.email && (
                        <div className="mt-3 text-sm text-muted-foreground break-words">
                          {member.email}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Team;
