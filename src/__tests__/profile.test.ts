import { describe, expect, it } from "vitest";
    import { profileSchema } from "@/lib/schemas";

    describe("profileSchema", () => {
      it("menerima profil lengkap dan menormalkan spasi telepon serta trim nama", () => {
        const input = {
          name: "  Budi Santoso  ",
          phone: "+62 812 3456 7890",
          address: "  Jl. Sudirman No. 123  ",
        };
        const result = profileSchema.safeParse(input);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            name: "Budi Santoso",
            phone: "+6281234567890",
            address: "Jl. Sudirman No. 123",
          });
        }
      });

      it("menerima telepon dan alamat kosong serta mengubahnya menjadi null", () => {
        const input = {
          name: "Ani",
          phone: "   ",
          address: "",
        };
        const result = profileSchema.safeParse(input);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual({
            name: "Ani",
            phone: null,
            address: null,
          });
        }
      });

      it("menolak nama terlalu pendek dan format nomor telepon yang salah", () => {
        const invalidName = profileSchema.safeParse({
          name: " A ",
          phone: "",
          address: "",
        });
        expect(invalidName.success).toBe(false);

        const invalidPhone = profileSchema.safeParse({
          name: "Budi",
          phone: "12345", // kurang dari 8 digit
          address: "",
        });
        expect(invalidPhone.success).toBe(false);
      });
    });