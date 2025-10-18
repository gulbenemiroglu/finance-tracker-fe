
import { z } from "zod";

export const loginSchema = z.object({


    email: z
        .email({ message: "Geçerli bir email adresi giriniz." }),

    password: z
        .string()
        .nonempty("Şifre alanı boş bırakılamaz.")
        .min(6, "Şifre en az 6 karakter olmalıdır."),


})


