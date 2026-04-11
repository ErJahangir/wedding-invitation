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
      className="py-24 bg-heritage-cream text-heritage-maroon overflow-hidden relative"
    >
      {/* Decorative Ornaments */}
      <div className="absolute inset-0 mandala-pattern opacity-[0.03] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[40px] border-heritage-maroon/5" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[40px] border-heritage-maroon/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-heritage-maroon font-semibold tracking-widest uppercase text-xs"
          >
            A Journey of Tradition
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-heritage-maroon"
          >
            A Sacred Union
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="flex items-center justify-center gap-4 py-4"
          >
            <div className="h-[1px] w-12 bg-heritage-maroon/20" />
            <Flower2 className="w-8 h-8 text-heritage-gold shadow-sm" />
            <div className="h-[1px] w-12 bg-heritage-maroon/20" />
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
              <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border border-heritage-maroon/10 hover:border-heritage-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-heritage-maroon/5">
                <div className="relative mb-8 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-heritage-maroon/10 group-hover:border-heritage-gold transition-all duration-500 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-heritage-maroon/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="text-center flex-grow">
                  <span className="text-heritage-gold font-bold tracking-widest text-xs mb-2 block uppercase">
                    {item.label}
                  </span>
                  <h3 className="text-2xl font-majestic mb-4 text-heritage-maroon group-hover:text-heritage-gold transition-colors uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <div className="flex justify-center mb-4">
                    <div className="h-0.5 w-8 bg-heritage-maroon/10 rounded-full" />
                  </div>
                  <p className="text-heritage-maroon/70 leading-relaxed italic line-clamp-4 font-medium">
                    {item.description}
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
