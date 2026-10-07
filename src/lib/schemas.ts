import { z } from "zod";
import { ORDER_STATUSES } from "./orders";

// Validation = is this input well-formed? A schema says it once, on the
// server, instead of a pile of typeof / Number.isInteger checks.

export const orderStatusInput = z.object({
  orderId: z.coerce.number().int().positive(),
  status: z.enum(ORDER_STATUSES),
});

// TODO P2: profileSchema
//   name:    wajib, 2–40 karakter (setelah trim)
//   phone:   boleh kosong (→ null); kalau diisi 8–15 digit, boleh diawali "+"
//   address: boleh kosong (→ null); maksimal 200 karakter

export const profileSchema = z.object({
  name: z
  .string()
  .trim()
  .min(2, "Nama minimal 2 karakter")
  .max(40, "Nama maksimal 40 karakter"),
  phone: z.string()
  .transform((v) => v.replace(/\s+/g, ""))
  .transform((v) => (v === "" ? null : v))
  .pipe(
    z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, "Nomor telepon harus 8–15 digit, boleh diawali +")
    .nullable(),
  ),
  address: z 
  .string()
  .trim()
  .max(200, "Max 200 char")
  .transform((v) => ( v === "" ? null : v))
});

export type ProfileInput = z.infer<typeof profileSchema>;