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
import SignInContainer from '@/components/sign-in-container';
import Card from '@/components/card';
import { registerSchema } from '@/schemas/register-schema';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    const [toast, setToast] = React.useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "warning" | "info",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        setFormData({
            name: inputName === "name" ? inputValue : formData.name,
            surname: inputName === "surname" ? inputValue : formData.surname,
            email: inputName === "email" ? inputValue : formData.email,
            password: inputName === "password" ? inputValue : formData.password,
            confirmpassword: inputName === "confirmpassword" ? inputValue : formData.confirmpassword,
        });
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
        setToast({
            open: true,
            message: "Lütfen formu doğru doldurunuz.",
            severity: "error",
        });
        return true;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInputs()) return;

        setToast({
            open: true,
            message: "Kayıt başarılı!",
            severity: "success",
        });
    };



    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between "  >
                <Card variant="outlined" sx={{
                    maxWidth: 400,
                    width: "100%",
                    margin: "auto",
                    overflowY: "auto",
                }}>
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
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setToast({ ...toast, open: false })}
                    severity={toast.severity}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
}