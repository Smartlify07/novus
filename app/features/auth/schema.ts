import * as z from 'zod';
const loginFormSchema = z.object({
  email: z.email({
    error:
      'Your email is required to proceed. Please enter a valid email address',
  }),
  password: z
    .string({
      error: 'Please enter a valid password',
    })
    .min(1, 'Your password is required to proceed.')
    .min(8, 'Password must at least 8 characters'),
});

const signupFormSchema = z
  .object({
    name: z.string({
      error: 'This field cannot be empty',
    }),

    email: z.email({
      error: 'Invalid email address',
    }),
    password: z
      .string({
        error: 'Please enter a valid password',
      })
      .min(1, 'Your password is required to proceed.')
      .min(8, 'Password must at least 8 characters'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
export { loginFormSchema, signupFormSchema };
