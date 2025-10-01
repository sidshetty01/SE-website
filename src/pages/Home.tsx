import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-drones.jpg";
import seEmblem from "../../image (2) (1).png";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Soaring Eagles Drones" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        {/* Animated Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <img
                src={seEmblem}
                alt="Soaring Eagles Logo"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-glow-strong border border-primary/30 object-contain bg-background/60"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="glow-primary">Soaring Eagles</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gradient font-semibold">
              Aerial Robotics Club
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Drones & RC Planes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Teamwork</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="font-medium">Ambition</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Honour</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/projects">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline-hero" size="lg" asChild>
              <Link to="/team">Meet the Team</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-glow" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 glow-primary">What We Do</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building the future of aerial robotics through innovation and collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "Pushing boundaries with cutting-edge drone and RC plane technology",
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working together to achieve extraordinary results in aerial robotics",
              },
              {
                icon: Trophy,
                title: "Excellence",
                description: "Striving for the highest standards in every project we undertake",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow p-8 rounded-xl glass group cursor-pointer"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
