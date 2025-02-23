import { z } from 'zod';

const getValidationSchema = (isSignUp: boolean) => z.object({
  email: z.string().email('Невалидный email'),
  password: z.string().trim().min(8, 'Минимальная длина пароля 8 символов'),
  confirmPassword: z.string().trim(),
}).refine(
  ({ password, confirmPassword }) => isSignUp ? password === confirmPassword : true,
  { message: 'Пароли должны совпадать', path: ['confirmPassword'] }
);

export default getValidationSchema;
