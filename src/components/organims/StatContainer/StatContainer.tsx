export function StatContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow text-white h-auto flex md:flex-row flex-col gap-5 md:h-36">
      {children}
    </div>
  );
}
