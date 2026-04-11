import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Heart } from "lucide-react";
import { formatEventDate } from "@/utils/date";

export default function Events() {
  const config = useConfig();
  const agenda = config?.agenda || [];

  if (!agenda.length) return null;

  return (
    <section
      id="event"
      className="py-16 relative overflow-hidden bg-transparent mandala-pattern"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-maroon/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-heritage-gold/5 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-heritage-maroon font-bold tracking-[0.2em] uppercase text-xs font-majestic"
          >
            The Auspicious Occasion
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-majestic text-heritage-maroon"
          >
            Wedding Itinerary
          </motion.h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-heritage-gold" />
            <Heart className="w-5 h-5 text-heritage-maroon fill-heritage-maroon/10" />
            <div className="h-[1px] w-12 bg-heritage-gold" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-heritage-maroon/10 via-heritage-gold/40 to-heritage-maroon/10 hidden md:block" />

          <div className="space-y-8">
            {agenda.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Side */}
                <div
                  className={`flex-1 w-full ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <div
                    className={`glass-card p-6 rounded-[2rem] group hover:shadow-2xl transition-all duration-500 border-l-8 ${index % 2 === 0 ? "border-heritage-maroon" : "border-heritage-gold"}`}
                  >
                    <h3 className="text-3xl font-majestic text-heritage-maroon mb-2 group-hover:text-red-700 transition-colors">
                      {item.title}
                    </h3>
                    <div
                      className={`flex items-center gap-2 text-heritage-maroon/70 mb-4 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-bold">
                        {formatEventDate(item.date, "full")}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div
                        className={`flex items-center gap-4 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}
                      >
                        <div className="p-3 bg-heritage-maroon/5 rounded-2xl">
                          <Clock className="w-5 h-5 text-heritage-maroon" />
                        </div>
                        <span className="text-heritage-maroon font-bold">
                          {item.start_time} - {item.end_time || "End"}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-4 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}
                      >
                        <div className="p-3 bg-heritage-maroon/5 rounded-2xl">
                          <MapPin className="w-5 h-5 text-heritage-maroon" />
                        </div>
                        <div
                          className={`${index % 2 === 0 ? "text-left" : "md:text-right"}`}
                        >
                          <p className="text-heritage-maroon font-bold">
                            {item.location}
                          </p>
                          <p className="text-heritage-maroon/70 text-sm italic font-medium">
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-heritage-gold/30 shadow-xl items-center justify-center z-20">
                  <div
                    className={`w-4 h-4 rounded-full ${index % 2 === 0 ? "bg-heritage-maroon" : "bg-heritage-gold"} animate-pulse`}
                  />
                </div>

                {/* Number Side (Desktop only) */}
                <div className="flex-1 hidden md:block">
                  <div
                    className={`${index % 2 === 0 ? "text-right" : "text-left"}`}
                  >
                    <span className="text-6xl font-majestic text-heritage-maroon/10 selection:bg-transparent">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
