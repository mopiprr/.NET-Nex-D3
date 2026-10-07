"use server";

import type { Profile } from "@/lib/types";
import { refresh } from "next/cache";
import { requireUser } from "@/lib/auth";
import { profileSchema } from "@/lib/schemas";
import { updateProfile } from "@/lib/users";

type Field = keyof Profile; // "name" | "phone" | "address"

export type ProfileFormState = {
  ok: boolean;
  errors: Partial<Record<Field | "form", string>>;
  // What the user typed, so the form can show it again after an error
  values: Record<Field, string>;
} | null;

// TODO P2: updateProfileAction
//   1. Siapa? Ambil user dari session (bukan dari form).
//   2. Validasi dengan profileSchema. Gagal → kembalikan errors + values.
//   3. Simpan dengan updateProfile(user.id, data), lalu refresh().
export async function updateProfileAction(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const user = await requireUser();

  const values: Record<Field, string> = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    address: String(formData.get("address") ?? ""),
  };

  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<Field | "form", string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as Field;
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { ok: false, errors, values };
  }

  await updateProfile(user.id, parsed.data);
  refresh();

  return { ok: true, errors: {}, values };
}