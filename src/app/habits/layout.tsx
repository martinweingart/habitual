import { NavBar } from "@/components/NavBar";

export default function HabitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full grid grid-rows-[auto_minmax(0,1fr)] bg-white">
      <NavBar />
      <div className="h-full px-2 md:px-30 lg:px-40 xl:px-60 py-5 box-border">
        {children}
      </div>
    </section>
  );
}
