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
      className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-heritage-maroon via-red-900 to-heritage-maroon mandala-pattern"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-gold rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-heritage-ruby rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="glass-card p-6 sm:p-10 rounded-[3rem] border-heritage-gold/20 shadow-2xl relative group overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

            {/* Couple Image on Cover */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex justify-center mb-6 relative z-10"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-heritage-gold via-heritage-maroon to-heritage-gold shadow-2xl">
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
              className="text-center mb-6"
            >
              <h2 className="text-heritage-maroon font-majestic tracking-[0.2em] text-lg mb-1 drop-shadow-sm">
                ॥ श्री गणेशाय नमः ॥
              </h2>
              <div className="flex justify-center">
                <Flower2 className="w-5 h-5 text-heritage-maroon/40 animate-pulse" />
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="text-center space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-1"
              >
                <p className="text-heritage-maroon/60 uppercase tracking-[0.2em] text-[10px] font-bold">
                  With the blessings of elders
                </p>
                <div className="h-[1px] w-10 bg-heritage-gold/40 mx-auto mt-2" />
              </motion.div>

              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-majestic text-heritage-maroon leading-tight"
              >
                {config.groomName}
                <div className="flex items-center justify-center gap-3 my-1">
                  <span className="h-[1px] flex-1 bg-heritage-maroon/10" />
                  <span className="text-heritage-gold italic font-serif text-xl lowercase">
                    wed
                  </span>
                  <span className="h-[1px] flex-1 bg-heritage-maroon/10" />
                </div>
                {config.brideName}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <div className="flex items-center gap-2 text-heritage-maroon font-bold text-sm">
                  <Calendar className="w-4 h-4 text-heritage-gold" />
                  <span>{formatEventDate(config.date, "short")}</span>
                </div>
                <div className="flex items-center gap-2 text-heritage-maroon font-bold text-sm">
                  <Clock className="w-4 h-4 text-heritage-gold" />
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
                whileHover={{ scale: 1.02, backgroundColor: "#600000" }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className="w-full bg-heritage-maroon text-heritage-gold border border-heritage-gold/30 px-6 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-300 shadow-xl font-majestic text-sm"
              >
                Open Invitation
              </motion.button>
              <p className="mt-3 text-[10px] text-heritage-maroon/40 text-center uppercase tracking-widest font-bold">
                Tap to witness our divine union
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
