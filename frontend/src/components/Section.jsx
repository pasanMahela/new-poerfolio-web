import { motion } from "framer-motion";

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="border-t border-zinc-200/60 dark:border-white/5">
      <div className="container py-16 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.45 }}
            className="mt-2 text-zinc-600 dark:text-zinc-400"
          >
            {subtitle}
          </motion.p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
