import { redirect } from "next/navigation";

export const metadata = {
  title: "Applications Closed | ClawComp",
  description: "ClawComp 2026 is no longer accepting applications.",
};

export default function ApplyPage() {
  // ClawComp 2026 has closed — applications are no longer accepted.
  redirect("/");
}
