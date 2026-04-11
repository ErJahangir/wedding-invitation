import { useConfig } from "@/features/invitation/hooks/use-config";
import { Clock, MapPin, CalendarCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { formatEventDate } from "@/utils/date";

export default function Location() {
  const config = useConfig();

  return (
    <>
      <section
        id="location"
        className="py-24 relative overflow-hidden bg-transparent"
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block text-emerald-600 font-semibold tracking-widest uppercase text-sm"
            >
              Ceremony Venue
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-emerald-950"
            >
              Location & Directions
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-gold-200" />
              <MapPin className="w-6 h-6 text-gold-500/70" />
              <div className="h-[1px] w-12 bg-gold-200" />
            </motion.div>
          </motion.div>

          {/* Location Content */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-12 items-center">
            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative z-10"
            >
              <iframe
                src={config.maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </motion.div>

            {/* Venue Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 sm:p-12 shadow-xl border border-emerald-50">
                <h3 className="text-3xl font-serif text-emerald-950 mb-8 pb-4 border-b border-emerald-50">
                  {config.location}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest mb-1">
                        Address
                      </p>
                      <p className="text-emerald-800 font-medium leading-relaxed">
                        {config.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <CalendarCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest mb-1">
                        Date
                      </p>
                      <p className="text-emerald-800 font-medium">
                        {formatEventDate(config.date, "full")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest mb-1">
                        Time
                      </p>
                      <p className="text-emerald-800 font-medium">
                        {config.time}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <motion.a
                      href={config.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#064e3b",
                        color: "#fbbf24",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-3 bg-emerald-900 text-gold-400 font-bold py-5 rounded-2xl shadow-lg transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>View on Maps</span>
                    </motion.a>
                    <p className="text-center text-[10px] text-emerald-900/40 uppercase tracking-tighter mt-3">
                      Click to view directions on Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
