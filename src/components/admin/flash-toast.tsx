"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, string> = {
  created: "নতুন প্রোডাক্ট যোগ করা হয়েছে। ওয়েবসাইটে এখন এটি দেখা যাচ্ছে।",
  updated: "পরিবর্তনগুলো সেভ হয়েছে।",
  deleted: "প্রোডাক্টটি মুছে ফেলা হয়েছে।",
};

/** Shows a one-time success toast after a redirect (e.g. /admin?notice=created), then cleans the URL. */
export function FlashToast({ notice }: { notice?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!notice || !MESSAGES[notice]) return;
    toast.success(MESSAGES[notice], { id: `notice-${notice}` });
    router.replace("/admin", { scroll: false });
  }, [notice, router]);

  return null;
}
