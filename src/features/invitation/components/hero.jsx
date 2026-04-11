import { Calendar, Clock, Flower2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/utils/date";
import { getGuestName } from "@/utils/storage";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  const config = useConfig();
  const [guestName, setGuestName] = useState("");
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    const storedGuestName = getGuestName();
    if (storedGuestName) setGuestName(storedGuestName);
  }, []);

  /* ---------------- ANIMATED PARTICLES ---------------- */

  const RosePetals = ({ trigger }) => {
    const [petals, setPetals] = useState([]);
    useEffect(() => {
      if (!trigger) return;
      const newPetals = [...Array(40)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 5 + Math.random() * 3,
        size: 15 + Math.random() * 20,
        rotate: Math.random() * 360,
      }));
      setPetals(newPetals);
      const timer = setTimeout(() => setPetals([]), 8000);
      return () => clearTimeout(timer);
    }, [trigger]);

    return (
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -100, x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: "110vh",
              x: ["0vw", "10vw", "-10vw", "5vw"],
              rotate: petal.rotate + 720,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: petal.duration, delay: petal.delay, ease: "linear" }}
            className="absolute"
            style={{ left: `${petal.left}%` }}
          >
            <div 
              className="bg-emerald-500/30 rounded-full blur-[1px]" 
              style={{ width: petal.size, height: petal.size * 1.2, borderRadius: '60% 40% 70% 30% / 40% 50% 60% 70%' }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  if (!config) return null;

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-background to-emerald-50/50">
      <RosePetals trigger={showPetals} />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-200 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="container max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center"
      >
        {/* Entrance Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <span className="px-6 py-2 rounded-full border border-emerald-200 bg-emerald-50/50 text-emerald-700 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            The Sacred Union
          </span>
        </motion.div>

        {/* Main Couple Display */}
        <div className="relative mb-12 group cursor-pointer" onClick={() => setShowPetals(true)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-gold-400 via-emerald-500 to-gold-400 shadow-2xl overflow-hidden"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
              <img
                src={config.coupleImage || "/couple.png"}
                alt={config.title}
                className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
              />
            </div>
          </motion.div>
          
          {/* Decorative Rings */}
          <div className="absolute -inset-4 border border-emerald-200 rounded-full animate-[spin_10s_linear_infinite] opacity-50" />
          <div className="absolute -inset-8 border border-gold-200 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-30" />
        </div>

        {/* Heading Section */}
        <div className="text-center space-y-4 mb-10">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="text-emerald-800/60 italic font-serif text-lg md:text-xl"
          >
            {config.description}
          </motion.p>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-emerald-900 leading-tight"
          >
            {config.groomName} <span className="text-gold-500 italic">&</span> {config.brideName}
          </motion.h1>
        </div>

        {/* Quick Info Grid */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl glass-card p-8 rounded-3xl"
        >
          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="font-semibold text-emerald-900">{formatEventDate(config.date, "full")}</p>
            <p className="text-xs text-emerald-600/60 uppercase tracking-widest">The Date</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="font-semibold text-emerald-900">{config.time}</p>
            <p className="text-xs text-emerald-600/60 uppercase tracking-widest">The Time</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 group">
            <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="font-semibold text-emerald-900 line-clamp-1">{config.location}</p>
            <p className="text-xs text-emerald-600/60 uppercase tracking-widest">The Venue</p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 w-full"
        >
          <CountdownTimer targetDate={config.date} />
        </motion.div>

        {/* Guest Greeting */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 text-center"
        >
          <p className="text-emerald-900 font-medium">
            Dear <span className="text-gold-600 font-bold">{guestName || "Guest"}</span>, we look forward to your presence.
          </p>
          <div className="mt-4 flex flex-col items-center">
             <Flower2 className="w-8 h-8 text-emerald-500 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
