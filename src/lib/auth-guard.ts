import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** The current admin session, verified against the database (deduped per request). */
export const getAdminSession = cache(async () => auth());

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session?.user?.id) redirect("/admin/login");
  return session;
}
