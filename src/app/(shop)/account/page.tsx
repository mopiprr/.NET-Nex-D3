import type { Metadata } from "next";
import { Suspense } from "react";
import { requireUser } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/roles";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = { title: "Akun saya — Padre Gino's" };

// TODO P2: only for signed-in users. Show "@login · role" and <ProfileForm />
// filled with the user's current profile. Remember: reading the session is
// request data, so it needs a <Suspense> boundary.

async function AccountContent() {
  const user = await requireUser();

  return (
    <>
      <p className="mt-1 text-sm text-ink/60">
        @{user.login} · <span className="font-medium text-ink">{ROLE_LABELS[user.role]}</span>
      </p>
      <ProfileForm profile={user} />
    </>
  );
}

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-3xl font-black">Akun saya</h1>
      <Suspense fallback={<p className="mt-4 text-ink/60">Loading profile</p>}>
        <AccountContent />
      </Suspense>
    </section>
  );
}