import { NextResponse } from "next/server";

// ClawComp 2026 has closed — applications are no longer accepted, so the
// public applicant magic-link endpoint is disabled.
export async function POST() {
  return NextResponse.json(
    { error: "applications_closed" },
    { status: 403 }
  );
}
