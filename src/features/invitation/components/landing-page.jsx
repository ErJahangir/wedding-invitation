import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/utils/date";
import { motion } from "framer-motion";
import { Calendar, Clock, Flower2 } from "lucide-react";

/**
 * Premium Landing Page (Envelope Cover)
 * Represents the traditional invitation cover with sacred elements.
 */
const LandingPage = ({ onOpenInvitation }) => {
  const config = useConfig();

  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-950 via-emerald-900 to-emerald-950"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="glass-card p-8 sm:p-12 rounded-[3rem] border-white/10 shadow-2xl relative group overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

            {/* Couple Image on Cover */}
            <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
               className="flex justify-center mb-8 relative z-10"
            >
               <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-gold-400 via-emerald-600 to-gold-400 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                     <img 
                       src={config.coupleImage || "/couple.png"} 
                       alt="Couple"
                       className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </motion.div>

            {/* Sacred Mantra */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-gold-600 font-serif tracking-[0.2em] text-lg mb-2">
                || श्री गणेशाय नमः ||
              </h2>
              <div className="flex justify-center">
                <Flower2 className="w-6 h-6 text-gold-500/50 animate-pulse" />
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="text-center space-y-8 mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <p className="text-emerald-900/60 uppercase tracking-[0.3em] text-xs font-bold">
                  With the blessings of elders
                </p>
                <div className="h-[1px] w-12 bg-gold-300 mx-auto mt-4" />
              </motion.div>

              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif text-emerald-950 leading-tight"
              >
                {config.groomName}
                <div className="flex items-center justify-center gap-4 my-2">
                  <span className="h-[1px] flex-1 bg-emerald-100" />
                  <span className="text-gold-600 italic font-serif text-2xl lowercase">
                    wed
                  </span>
                  <span className="h-[1px] flex-1 bg-emerald-100" />
                </div>
                {config.brideName}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Calendar className="w-4 h-4 text-gold-600" />
                  <span>{formatEventDate(config.date, "short")}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Clock className="w-4 h-4 text-gold-600" />
                  <span>{config.time}</span>
                </div>
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="relative z-20"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#064e3b" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenInvitation}
                className="w-full bg-emerald-900 text-gold-400 border border-gold-500/30 px-8 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-300 shadow-xl"
              >
                View Sacred Invitation
              </motion.button>
              <p className="mt-4 text-xs text-emerald-800/40 text-center uppercase tracking-tighter">
                Click to open your invitation
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
