import { Sidebar } from "../navigation/Sidebar";
import { TopNavbar } from "../navigation/TopNavbar";

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

export function ApplicationLayout({ children }: ApplicationLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto outline-none" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
