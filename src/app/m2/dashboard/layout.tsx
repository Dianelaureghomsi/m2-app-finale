import { DashboardNavbar } from "@/src/components/layouts/DashboardNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | M2",
  description: "",
};

type DashboardLayoutProps = React.PropsWithChildren;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </main>
  );
}
