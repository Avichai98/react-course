import { z } from 'zod'

export const userRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),

  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),

  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val || val === '') return true
      return /^\+?[\d\s\-()]+$/.test(val) && val.replace(/\D/g, '').length >= 10
    }, 'Please enter a valid phone number with at least 10 digits'),

  // Account Information
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),

  // Personal Preferences
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 13 && age <= 120
    }, 'You must be between 13 and 120 years old'),

  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'], {
    required_error: 'Please select your gender'
  }),

  country: z.string()
    .min(1, 'Please select your country'),

  // Preferences
  interests: z.array(z.string())
    .min(1, 'Please select at least one interest'),

  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your experience level'
  }),

  skillRating: z.number()
    .min(1, 'Please rate your skill level')
    .max(10, 'Rating cannot exceed 10'),

  // Additional Information
  bio: z.string()
    .max(500, 'Bio must not exceed 500 characters')
    .optional()
    .or(z.literal('')),

  // Agreements
  agreeToTerms: z.boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),

  subscribeNewsletter: z.boolean()
    .optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>