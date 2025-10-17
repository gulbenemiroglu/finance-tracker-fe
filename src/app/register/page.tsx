"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SignInContainer from '@/components/SignInContainer';
import Card from '@/components/Card';
import { z } from "zod";


const registerSchema = z.object({
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




export default function Register(props: { disableCustomTheme?: boolean }) {

    const [formData, setFormData] = React.useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [open, setOpen] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateInputs = () => {
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const newErrors: Record<string, string> = {};
            Object.entries(fieldErrors).forEach(([key, val]) => {
                newErrors[key] = Array.isArray(val) ? val[0] || "" : "";
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInputs()) return;

        console.log("✅ Form verileri:", formData);
        alert("Kayıt başarılı!");
    };



    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <TextField
                                id="name"
                                type="text"
                                name="name"
                                placeholder="your name"
                                value={formData.name}
                                autoComplete="text"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}

                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="surname">Surname</FormLabel>
                            <TextField
                                id="surname"
                                type="text"
                                name="surname"
                                placeholder="your surname"
                                autoComplete="text"
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.surname}
                                onChange={handleChange}
                                error={!!errors.surname}
                                helperText={errors.surname}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
                            <TextField
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                placeholder="••••••"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                error={!!errors.confirmpassword}
                                helperText={errors.confirmpassword}
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </Button>

                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Google')}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Facebook')}
                        >
                            Sign in with Facebook
                        </Button>

                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}