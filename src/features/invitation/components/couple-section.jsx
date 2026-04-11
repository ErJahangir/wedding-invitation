import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { Flower2 } from "lucide-react";

export default function CoupleSection() {
  const config = useConfig();

  if (!config) return null;

  return (
    <section
      id="couple"
      className="py-16 relative overflow-hidden bg-heritage-maroon/[0.02] backdrop-blur-sm mandala-pattern"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-heritage-maroon font-bold tracking-[0.2em] uppercase text-xs font-majestic"
          >
            With the blessings of Almighty
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-majestic text-heritage-maroon drop-shadow-sm"
          >
            The Happy Couple
          </motion.h2>
          <div className="flex justify-center">
            <Flower2 className="w-6 h-6 text-heritage-gold/50" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Groom Side */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl relative z-10">
                <img
                  src={
                    config.groomImage ||
                    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&h=800"
                  }
                  alt={config.groomName}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
              </div>
              {/* Gold Ornament behind */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-heritage-gold/20 rounded-full blur-2xl -z-0" />
            </div>
            <div className="mt-6 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-majestic text-heritage-maroon mb-1">
                {config.groomName}
              </h3>
              <p className="text-heritage-gold font-bold tracking-widest uppercase text-[10px] mb-2 font-serif">
                The Groom
              </p>
              <p className="text-heritage-maroon/70 italic text-sm leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
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
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl relative z-10">
                <img
                  src={
                    config.brideImage ||
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800"
                  }
                  alt={config.brideName}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
              </div>
              {/* Ruby Ornament behind */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-heritage-ruby/10 rounded-full blur-2xl -z-0" />
            </div>
            <div className="mt-6 text-center md:text-right">
              <h3 className="text-3xl md:text-4xl font-majestic text-heritage-maroon mb-1">
                {config.brideName}
              </h3>
              <p className="text-heritage-gold font-bold tracking-widest uppercase text-[10px] mb-2 font-serif">
                The Bride
              </p>
              <p className="text-heritage-maroon/70 italic text-sm leading-relaxed max-w-sm mx-auto md:ml-auto md:mr-0 font-medium">
                Daughter of {config.parentBride}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
