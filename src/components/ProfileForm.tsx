"use client";

import type { Profile } from "@/lib/types";
import { useActionState } from "react";
import { updateProfileAction } from "@/app/(shop)/account/actions";

// Markup is ready. TODO P2: connect it to updateProfileAction with
// useActionState, show errors per field, keep typed values after an error,
// and show "Profil disimpan." after a successful save.
export default function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, null);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4" noValidate>
      {state?.ok && (
        <p role="status" className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">
          Profil disimpan.
        </p>
      )}
      <Field
        label="Nama"
        name="name"
        defaultValue={state?.values.name ?? profile.name}
        error={state?.errors.name}
      />
      <Field
        label="Telepon"
        name="phone"
        defaultValue={state?.values.phone ?? profile.phone ?? ""}
        inputMode="tel"
        error={state?.errors.phone}
      />
      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold">Alamat pengiriman</span>
        <textarea
          name="address"
          rows={3}
          defaultValue={state?.values.address ?? profile.address ?? ""}
          aria-invalid={state?.errors.address ? true : undefined}
          aria-describedby="address-error"
          className="rounded-lg border border-black/10 px-3 py-2 aria-invalid:border-red-500"
        />
        {state?.errors.address && (
          <span id="address-error" className="text-xs text-red-600">
            {state.errors.address}
          </span>
        )}
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-lg bg-brand px-5 py-2 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Menyimpan…" : "Simpan profil"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  inputMode,
  error,
}: {
  label: string;
  name: string;
  defaultValue: string;
  inputMode?: "tel";
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${name}-error`}
        className="rounded-lg border border-black/10 px-3 py-2 aria-invalid:border-red-500"
      />
      {error && (
        <span id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}