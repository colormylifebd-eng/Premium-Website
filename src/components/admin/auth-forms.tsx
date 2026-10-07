"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginAction,
  requestPasswordResetAction,
  resetPasswordAction,
  type AuthFormState,
} from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, FormMessage, PasswordInput, SubmitButton } from "./form-parts";

export function LoginForm({ callbackUrl, notice, initialError }: { callbackUrl?: string; notice?: string; initialError?: string }) {
  const [state, formAction] = useActionState<AuthFormState, FormData>(loginAction, { error: initialError });

  return (
    <form action={formAction} className="space-y-5">
      {notice && !state.error && <FormMessage type="success">{notice}</FormMessage>}
      <FormMessage type="error">{state.error}</FormMessage>
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/admin"} />
      <div className="space-y-2">
        <Label htmlFor="email">ইমেইল</Label>
        <Input
          key={state.email ?? "email"}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="password">পাসওয়ার্ড</Label>
          <Link href="/admin/forgot-password" className="text-sm font-semibold text-brand-600 hover:underline">
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>
        <PasswordInput id="password" name="password" autoComplete="current-password" required />
      </div>
      <SubmitButton pendingText="লগইন হচ্ছে...">লগইন করুন</SubmitButton>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthFormState, FormData>(requestPasswordResetAction, {});

  if (state.success) return <FormMessage type="success">{state.success}</FormMessage>;

  return (
    <form action={formAction} className="space-y-5">
      <FormMessage type="error">{state.error}</FormMessage>
      <div className="space-y-2">
        <Label htmlFor="email">অ্যাডমিন ইমেইল</Label>
        <Input
          key={state.email ?? "email"}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          className="h-11"
        />
      </div>
      <SubmitButton pendingText="পাঠানো হচ্ছে...">রিসেট লিংক পাঠান</SubmitButton>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState<AuthFormState, FormData>(resetPasswordAction, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormMessage type="error">{state.error}</FormMessage>
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label htmlFor="password">নতুন পাসওয়ার্ড</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
          aria-invalid={Boolean(errors.password)}
          aria-describedby="password-hint"
        />
        <p id="password-hint" className="text-xs text-muted-foreground">কমপক্ষে ৮ অক্ষর। অক্ষর, সংখ্যা ও চিহ্ন মিলিয়ে দিলে বেশি নিরাপদ।</p>
        <FieldError id="password-error">{errors.password}</FieldError>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">পাসওয়ার্ডটি আবার লিখুন</Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
        />
        <FieldError id="confirm-error">{errors.confirmPassword}</FieldError>
      </div>
      <SubmitButton pendingText="সেভ হচ্ছে...">নতুন পাসওয়ার্ড সেভ করুন</SubmitButton>
    </form>
  );
}
