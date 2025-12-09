export default function TechPill({ children }) {
  return (
    <span className="rounded-full bg-white/70 px-2.5 py-1 text-xs text-zinc-700 ring-1 ring-zinc-200/80 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10">
      {children}
    </span>
  );
}
