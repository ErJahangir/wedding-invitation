import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/utils/date";

export default function Agenda() {
  const config = useConfig();
  const agenda = config?.agenda || [];

  if (!agenda.length) return null;

  return (
    <section id="agenda" className="py-24 relative overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-semibold tracking-widest uppercase text-sm"
          >
            Schedule of Events
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-emerald-950"
          >
            Wedding Timeline
          </motion.h2>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-emerald-200" />
             <Calendar className="w-5 h-5 text-emerald-400" />
             <div className="h-[1px] w-12 bg-emerald-200" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-100 via-emerald-300 to-emerald-100 hidden md:block" />

          <div className="space-y-12">
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
                <div className={`flex-1 w-full ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className={`glass-card p-6 rounded-3xl group hover:shadow-2xl transition-all duration-500 border-l-4 ${index % 2 === 0 ? "border-emerald-500" : "border-gold-500"}`}>
                    <h3 className="text-2xl font-serif text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className={`flex items-center gap-2 text-emerald-600/70 mb-4 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}>
                       <Calendar className="w-4 h-4" />
                       <span className="text-sm font-medium">{formatEventDate(item.date, "full")}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}>
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <Clock className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-emerald-900 font-medium italic">
                          {item.start_time} - {item.end_time || "End"}
                        </span>
                      </div>
                      
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? "justify-start" : "md:justify-end"}`}>
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-emerald-800 text-sm leading-relaxed">
                          {item.location} <br />
                          <span className="text-emerald-600/60">{item.address}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-emerald-100 shadow-lg items-center justify-center z-20">
                  <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? "bg-emerald-500" : "bg-gold-500"}`} />
                </div>

                {/* Date Side (Desktop only) */}
                <div className="flex-1 hidden md:block">
                   <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
                     <span className="text-4xl font-serif text-emerald-100/50 block">0{index + 1}</span>
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
