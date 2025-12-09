import { motion } from "framer-motion";

// Compatible with React Bits Timeline – swap markup later if desired

export default function Timeline({ items }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative flex items-start gap-6"
          >
            {/* Timeline dot */}
            <motion.div 
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              whileHover={{ scale: 1.1 }}
              whileFocus={{ scale: 1.1 }}
              tabIndex={0}
              role="button"
              aria-label={`Timeline milestone: ${item.title}`}
            >
              <motion.div 
                className="h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-500"
                whileHover={{ 
                  backgroundColor: "rgb(99 102 241)", // indigo-500
                  scale: 1.2 
                }}
                whileFocus={{ 
                  backgroundColor: "rgb(99 102 241)", // indigo-500
                  scale: 1.2 
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {item.year}
                </span>
              </div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

