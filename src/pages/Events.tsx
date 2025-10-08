import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Events: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 pb-8 px-2 lg:px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl font-bold glow-primary mb-3">Events</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Upcoming and past events from the Soaring Eagles</p>
        </motion.div>

  <div className="mb-12">
          {(() => {
            const location = useLocation();
            const path = location.pathname.replace(/\/$/, "");
            const isUpcomingActive = path === "/events" || path.endsWith("/upcoming");
            const isPastActive = path.endsWith("/past");

            return (
              <div className="max-w-4xl mx-auto">
                <div className="flex bg-card/60 rounded-full p-1 gap-1">
                  <Link
                    to="upcoming"
                    className={`flex-1 text-center py-3 rounded-full transition-all duration-150 ${isUpcomingActive ? 'bg-foreground text-background font-semibold' : 'text-muted-foreground hover:bg-foreground/5'}`}
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      <span>Upcoming Events</span>
                      <span className="ml-2 bg-muted-foreground/20 text-sm rounded-full px-2 py-0.5"> </span>
                    </div>
                  </Link>

                  <Link
                    to="past"
                    className={`flex-1 text-center py-3 rounded-full transition-all duration-150 ${isPastActive ? 'bg-foreground text-background font-semibold' : 'text-muted-foreground hover:bg-foreground/5'}`}
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      <span>Past Events</span>
                      <span className="ml-2 bg-muted-foreground/20 text-sm rounded-full px-2 py-0.5"> </span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Events;
