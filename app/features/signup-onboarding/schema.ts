import z from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneSchema = z.object({
  phone: z
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
      error: 'We’d love to know what to call you! Please enter your name.',
    })
    .regex(
      /^[a-zA-Z\s]*$/,
      'Just letters, please! Your name is unique enough without the numbers.',
    ),
});

export const otpSchema = z.object({
  otp: z.string().length(6, {
    error: 'Please enter the 6-digit code sent to your phone.',
  }),
});

export const passcodeSchema = z.object({
  passcode: z
    .string()
    .min(0, 'Your account needs a lock! Please create a password.')
    .length(6, {
      error:
        'Almost there! Your password needs at least 6 characters to stay safe.',
    }),
});

export const confirmPasscodeSchema = z.object({
  confirmPasscode: z.string().length(6, {
    error: 'Please re-enter your passcode to confirm.',
  }),
});

export const signupOnboardingSchema = phoneSchema
  .merge(firstNameSchema)
  .merge(otpSchema)
  .merge(passcodeSchema)
  .merge(confirmPasscodeSchema)
  .superRefine(({ confirmPasscode, passcode }, context) => {
    if (confirmPasscode !== passcode) {
      context.addIssue({
        code: 'custom',
        message: 'Whoops! The passcodes do not match. Please try again.',
        path: ['confirmPasscode'],
      });
    }
  });

export type SignupFormValues = z.input<typeof signupOnboardingSchema>;
