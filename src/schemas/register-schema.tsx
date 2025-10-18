import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .nonempty("İsim alanı boş bırakılamaz.")
        .min(2, "İsim en az 2 karakter olmalıdır."),

    surname: z
        .string()
        .nonempty("Soyisim alanı boş bırakılamaz.")
        .min(2, "Soyisim en az 2 karakter olmalıdır."),

    email: z
        .string()
        .nonempty("Email alanı boş bırakılamaz.")
        .email("Geçerli bir email adresi giriniz."),
    password: z
        .string()
        .nonempty("Şifre alanı boş bırakılamaz.")
        .min(6, "Şifre en az 6 karakter olmalıdır."),
    confirmpassword: z
        .string()
        .nonempty("Şifre tekrar alanı boş bırakılamaz."),

})
    .refine((data) => data.password === data.confirmpassword, {
        path: ["confirmpassword"],
        message: "Şifreler birbiriyle eşleşmiyor.",
    });



