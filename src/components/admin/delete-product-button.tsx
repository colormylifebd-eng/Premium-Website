"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { LoaderCircle, Trash } from "lucide-react";
import { deleteProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Delete with a confirmation step so products aren't removed by accident. */
export function DeleteProductButton({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      // From the edit page (not compact) the action redirects back to the list.
      const result = await deleteProduct(id, !compact);
      if (result.ok) {
        toast.success(`“${name}” মুছে ফেলা হয়েছে।`);
        setOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !pending && setOpen(next)}>
      <DialogTrigger asChild>
        <Button variant={compact ? "outline" : "destructive"} size={compact ? "sm" : "default"} className={compact ? "text-red-600 hover:bg-red-50" : undefined}>
          <Trash className="size-4" aria-hidden />
          <span className={compact ? "sr-only sm:not-sr-only" : undefined}>মুছে ফেলুন</span>
          {compact && <span className="sr-only">: {name}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>প্রোডাক্টটি মুছে ফেলবেন?</DialogTitle>
          <DialogDescription>
            “{name}” ওয়েবসাইট থেকে স্থায়ীভাবে মুছে যাবে, সাথে এর ছবিও। এটি আর ফিরিয়ে আনা যাবে না।
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>বাতিল</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                মুছে ফেলা হচ্ছে...
              </>
            ) : (
              "হ্যাঁ, মুছে ফেলুন"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
