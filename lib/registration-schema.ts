import { z } from 'zod';

export const GENDER_OPTIONS = [
  'Woman',
  'Man',
  'Non-binary',
  'Prefer to self-describe',
  'Prefer not to say',
] as const;

export const INTEREST_OPTIONS = [
  'Women',
  'Men',
  'Everyone',
  'Prefer not to say',
] as const;

export const INTENTION_OPTIONS = [
  'A long-term partnership',
  'A serious relationship, at the right pace',
  'A meaningful connection, taking things slowly',
  'Open-minded, guided by who I meet',
] as const;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Please keep your name under 120 characters.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email address.')
    .max(254, 'That email address is too long.')
    .email('Please enter a valid email address.'),
  city: z
    .string()
    .trim()
    .min(2, 'Please enter the city you live in.')
    .max(120, 'Please keep your city under 120 characters.'),
  gender: z.enum(GENDER_OPTIONS).optional(),
  interestedIn: z.enum(INTEREST_OPTIONS).optional(),
  relationshipIntention: z.enum(INTENTION_OPTIONS, {
    errorMap: () => ({ message: 'Please choose what you are looking for.' }),
  }),
  isAdult: z.literal(true, {
    errorMap: () => ({ message: 'You must be 18 or older to register.' }),
  }),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the Privacy Policy and Terms.' }),
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type RegistrationField = keyof RegistrationInput;
