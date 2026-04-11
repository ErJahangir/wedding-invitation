import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const target = moment(targetDate);
    const now = moment();

    // Log the comparison for the developer
    console.log(
      `[Countdown] Target: ${target.format()} | Now: ${now.format()}`,
    );

    if (target.isBefore(now)) {
      console.warn("[Countdown] The target date is in the past.");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const duration = moment.duration(target.diff(now));

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6 mt-8">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="flex flex-col items-center justify-center w-20 h-24  bg-white/10 backdrop-blur-md rounded-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:border-gold-500/50 transition-all duration-500 overflow-hidden">
            {/* Animated Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <AnimatePresence mode="wait">
              <motion.span
                key={item.value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900"
              >
                {item.value.toString().padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            <span className="text-[10px] sm:text-xs text-emerald-600/60 uppercase tracking-widest font-bold mt-2">
              {item.label}
            </span>
          </div>

          {/* Background Decorative Bloom */}
          <div className="absolute -z-10 inset-0 bg-emerald-100/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full scale-75" />
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
