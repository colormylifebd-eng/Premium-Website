import { z } from "zod";
import { toAsciiDigits } from "@/lib/format";

const email = z
  .string({ error: "ইমেইল লিখুন।" })
  .trim()
  .toLowerCase()
  .max(200, "ইমেইল ঠিকানা অনেক বড়।")
  .email("সঠিক ইমেইল ঠিকানা লিখুন।");

export const loginSchema = z.object({
  email,
  password: z.string({ error: "পাসওয়ার্ড লিখুন।" }).min(1, "পাসওয়ার্ড লিখুন।").max(200),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    token: z.string({ error: "রিসেট লিংকটি সঠিক নয়।" }).regex(/^[a-f0-9]{64}$/, "রিসেট লিংকটি সঠিক নয়।"),
    password: z
      .string({ error: "নতুন পাসওয়ার্ড লিখুন।" })
      .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।")
      .max(200, "পাসওয়ার্ড অনেক বড় হয়ে গেছে।"),
    confirmPassword: z.string({ error: "পাসওয়ার্ডটি আবার লিখুন।" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "দুটি পাসওয়ার্ড মিলছে না।",
    path: ["confirmPassword"],
  });

/** Normalizes typed prices like "৮,৫০০", "8,500 tk" or "৳ 8500" to "8500". */
export function normalizePriceInput(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return toAsciiDigits(value)
    .replace(/(tk|taka|টাকা)\.?$/i, "")
    .replace(/[,\s৳]/g, "");
}

export const productSchema = z.object({
  name: z
    .string({ error: "প্রোডাক্টের নাম লিখুন।" })
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে।")
    .max(120, "নাম ১২০ অক্ষরের মধ্যে রাখুন।"),
  description: z
    .string({ error: "বিবরণ লিখুন।" })
    .trim()
    .min(10, "বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে।")
    .max(2000, "বিবরণ ২০০০ অক্ষরের মধ্যে রাখুন।"),
  price: z
    .string()
    .regex(/^\d{1,9}$/, "মূল্য শুধু সংখ্যায় লিখুন (যেমন: ৮৫০০)।")
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(1, "মূল্য ০ এর বেশি হতে হবে।")
        .max(10_000_000, "মূল্য অনেক বেশি হয়ে গেছে।")
    ),
  categoryId: z
    .string({ error: "একটি ক্যাটাগরি নির্বাচন করুন।" })
    .trim()
    .min(1, "একটি ক্যাটাগরি নির্বাচন করুন।"),
  imageUrl: z
    .string({ error: "প্রোডাক্টের একটি ছবি আপলোড করুন।" })
    .trim()
    .min(1, "প্রোডাক্টের একটি ছবি আপলোড করুন।")
    .max(500),
});

export type ProductInput = z.infer<typeof productSchema>;
