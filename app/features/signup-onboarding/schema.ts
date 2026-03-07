import z from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { error: 'We need your number to secure your account.' })
    .transform((v, ctx) => {
      const p = parsePhoneNumberFromString(v, {
        defaultCountry: 'NG',
        extract: false,
      });
      if (!p?.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "That doesn't look like a full phone number. Double-check the digits?",
        });
        return z.NEVER;
      }
      return p.number;
    }),
});

export const firstNameSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      error:
        'We’d love to know what to call you! Please enter your first name.',
    })
    .regex(
      /^[a-zA-Z\s]*$/,
      'Just letters, please! Your name is unique enough without the numbers.',
    ),
});

export const lastNameSchema = z.object({
  lastName: z
    .string()
    .min(1, {
      error: 'We’d love to know what to call you! Please enter your last name.',
    })
    .regex(
      /^[a-zA-Z\s]*$/,
      'Just letters, please! Your name is unique enough without the numbers.',
    ),
});

export const addressSchema = z.object({
  address: z.string().min(1, {
    error: `We'd love to know your address!`,
  }),
});

export const dateOfBirthSchema = z.object({ dateOfBirth: z.coerce.date() });

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character',
    ),
});

export const confirmPasswordSchema = z.object({
  confirmPassword: z.string(),
});

export const emailSchema = z.object({
  email: z.email('Invalid email address'),
});

export const basicInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      error:
        'We would love to know what to call you! Please enter your first name.',
    })
    .regex(
      /^[a-zA-Z\s]*$/,
      'Just letters, please! Your name is unique enough without the numbers.',
    ),
  lastName: z
    .string()
    .min(1, {
      error: 'We would love to know what to call you! Please enter your last name.',
    })
    .regex(
      /^[a-zA-Z\s]*$/,
      'Just letters, please! Your name is unique enough without the numbers.',
    ),
  email: z.email('Invalid email address'),
});

export const personalInfoSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { error: 'We need your number to secure your account.' })
    .transform((v, ctx) => {
      const p = parsePhoneNumberFromString(v, {
        defaultCountry: 'NG',
        extract: false,
      });
      if (!p?.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "That doesn't look like a full phone number. Double-check the digits?",
        });
        return z.NEVER;
      }
      return p.number;
    }),
  dateOfBirth: z.coerce.date(),
  address: z.string().min(1, {
    error: `We'd love to know your address!`,
  }),
});

export const securitySchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: 'custom',
        message: 'Whoops! The passwords do not match. Please try again.',
        path: ['confirmPassword'],
      });
    }
  });

export const signupOnboardingSchema = phoneSchema
  .extend(firstNameSchema.shape)
  .extend(lastNameSchema.shape)
  .extend(passwordSchema.shape)
  .extend(dateOfBirthSchema.shape)
  .extend(emailSchema.shape)
  .extend(addressSchema.shape)
  .extend(confirmPasswordSchema.shape)
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: 'custom',
        message: 'Whoops! The passwords do not match. Please try again.',
        path: ['confirmPasscode'],
      });
    }
  });

export type SignupFormValues = z.input<typeof signupOnboardingSchema>;
