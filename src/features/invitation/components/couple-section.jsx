import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { Flower2 } from "lucide-react";

export default function CoupleSection() {
  const config = useConfig();

  if (!config) return null;

  return (
    <section id="couple" className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-semibold tracking-widest uppercase text-sm"
          >
            With the blessings of Almighty
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-emerald-950"
          >
            The Happy Couple
          </motion.h2>
          <div className="flex justify-center">
            <Flower2 className="w-8 h-8 text-gold-500/50" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Groom Side */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <img
                  src={config.groomImage || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&h=800"}
                  alt={config.groomName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              {/* Gold Ornament behind */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold-200/30 rounded-full blur-2xl -z-0" />
            </div>
            <div className="mt-8 text-center md:text-left">
              <h3 className="text-3xl font-serif text-emerald-950 mb-2">{config.groomName}</h3>
              <p className="text-emerald-700/60 font-medium tracking-widest uppercase text-xs mb-4">The Groom</p>
              <p className="text-emerald-800/70 italic text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Son of {config.parentGroom}
              </p>
            </div>
          </motion.div>

          {/* Bride Side */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <img
                  src={config.brideImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800"}
                  alt={config.brideName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              {/* Emerald Ornament behind */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl -z-0" />
            </div>
            <div className="mt-8 text-center md:text-right">
              <h3 className="text-3xl font-serif text-emerald-950 mb-2">{config.brideName}</h3>
              <p className="text-emerald-700/60 font-medium tracking-widest uppercase text-xs mb-4">The Bride</p>
              <p className="text-emerald-800/70 italic text-sm leading-relaxed max-w-sm mx-auto md:ml-auto md:mr-0">
                Daughter of {config.parentBride}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
