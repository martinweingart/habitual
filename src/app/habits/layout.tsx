import { NavBar } from "@/components/NavBar";

export default function HabitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <NavBar />
          <div className="px-40 py-5 flex flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
