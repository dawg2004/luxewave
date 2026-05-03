export function CardShell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">{children}</div>;
}
