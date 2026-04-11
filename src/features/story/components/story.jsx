import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

const unionTimeline = [
  {
    label: "The Beginning",
    title: "Family Meeting",
    description:
      "Our paths crossed through the choice of our families. A traditional meeting that laid the foundation of our respect and understanding.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    label: "The Promise",
    title: "Ring Ceremony",
    description:
      "With the blessings of our elders, we exchanged rings, promising to walk together in a life of shared values and traditions.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    label: "The Forever",
    title: "Sacred Union",
    description:
      "We now prepare to unite our families and souls in this holy matrimony, seeking your presence and blessings.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

export default function Story() {
  return (
    <section
      id="union"
      className="py-24 bg-emerald-950 text-white overflow-hidden relative"
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[40px] border-emerald-500" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[40px] border-gold-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-400 font-semibold tracking-widest uppercase text-sm"
          >
            A Journey of Tradition
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif"
          >
            A Sacred Union
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="flex items-center justify-center gap-4 py-4"
          >
            <Flower2 className="w-8 h-8 text-gold-500" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {unionTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group h-full "
            >
              <div className="flex flex-col h-full bg-white/5 backdrop-blur-sm p-8 rounded-[3rem] border border-white/10 hover:border-gold-500/50 transition-all duration-500">
                <div className="relative mb-8 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-gold-500/30 group-hover:border-gold-500 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gold-900/20 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="text-center flex-grow">
                  <span className="text-gold-500 font-bold tracking-widest text-sm mb-2 block uppercase">
                    {item.label}
                  </span>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-gold-400 transition-colors uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-emerald-100/60 leading-relaxed italic line-clamp-4">
                    "{item.description}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
