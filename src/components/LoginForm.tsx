'use client';

import { useAuthStore } from '@/store/authStore';
import { Login } from '@/types/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
      'Only Latin letters are allowed'
    )
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});

const registerSchema = loginSchema
  .extend({
    repeatPassword: z.string(),
    firstName: z
      .string()
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters'),
    lastName: z
      .string()
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Password do not match',
    path: ['repeatPassword'],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false); // false
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, registration } = useAuthStore();

  console.log(isRegister);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    const loginData: Login = { email: data.email, password: data.password };
    try {
      if (isRegister) {
        const registerData = data as RegisterFormData;
        try {
          await registration(registerData);
          setMessage('Registration is successful!');
        } catch (error) {
          // setMessage('Registration failed. Try again.');
          console.error(error);
        }
      }
      await login(loginData);
      setMessage('The entrance is successful!');
    } catch (error) {
      setIsRegister(true);
      // setMessage('User not found. Please register');
      console.error(error);
    }

    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}
      >
        <Typography variant='h4' align='center' gutterBottom>
          {isRegister ? 'Реєстрація' : 'Вхід'}
        </Typography>
        {message && (
          <Alert severity={isRegister ? 'info' : 'success'}>{message}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <>
              <TextField
                fullWidth
                label='First Name'
                margin='normal'
                {...register('firstName')}
                error={!!(errors as FieldErrors<RegisterFormData>).firstName}
                helperText={
                  (errors as FieldErrors<RegisterFormData>).firstName?.message
                }
              />
              <TextField
                fullWidth
                label='Last Name'
                margin='normal'
                {...register('lastName')}
                error={!!(errors as FieldErrors<RegisterFormData>).lastName}
                helperText={
                  (errors as FieldErrors<RegisterFormData>).lastName?.message
                }
              />
            </>
          )}
          <TextField
            fullWidth
            label='Email'
            type='email'
            margin='normal'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            margin='normal'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={togglePasswordVisibility} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {isRegister && (
            <TextField
              fullWidth
              label='Repeat password'
              type={showPassword ? 'text' : 'password'}
              margin='normal'
              {...register('repeatPassword')}
              error={!!(errors as FieldErrors<RegisterFormData>).repeatPassword}
              helperText={
                (errors as FieldErrors<RegisterFormData>).repeatPassword
                  ?.message
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={togglePasswordVisibility} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            {isRegister ? 'Реєстрація' : 'Вхід'}
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1, textTransform: 'none' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? 'Вже маєте обліковий запис? Вхід'
              : 'Не маєте акаунту? Реєстрація'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
