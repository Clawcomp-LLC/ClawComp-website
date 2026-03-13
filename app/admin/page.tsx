import { AdminPortal } from "@/components/admin/AdminPortal";

export const metadata = {
  title: "Admin Portal | ClawComp",
  description: "ClawComp application review portal",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen pt-24 pb-24">
      <AdminPortal />
    </main>
  );
}
