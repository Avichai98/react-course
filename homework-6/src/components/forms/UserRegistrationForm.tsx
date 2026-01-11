import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegistrationSchema, UserRegistrationFormData } from '../../schemas/userRegistrationSchema'
import { saveFormDataToStorage, loadFormDataFromStorage, clearFormDataFromStorage } from '../../utils/localStorage'
import { FormField, CustomCheckbox, CustomRadio } from '../ui'
import './UserRegistrationForm.css'

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
  'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore'
]

const INTERESTS = [
  'Programming', 'Web Development', 'Mobile Development', 'Data Science',
  'Machine Learning', 'Cybersecurity', 'Cloud Computing', 'DevOps',
  'UI/UX Design', 'Game Development', 'Blockchain', 'IoT'
]

const UserRegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
    trigger
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      interests: [],
      skillRating: 5,
      subscribeNewsletter: false,
      agreeToTerms: false
    }
  })

  // Watch form values for localStorage
  const watchedValues = watch()

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadFormDataFromStorage()
    if (Object.keys(savedData).length > 0) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key as keyof UserRegistrationFormData, value as never)
      })
      // Trigger validation after loading saved data
      setTimeout(() => trigger(), 100)
    }
  }, [setValue, trigger])

  // Save non-sensitive data to localStorage on form changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFormDataToStorage(watchedValues)
    }, 500) // Debounce saves

    return () => clearTimeout(timeoutId)
  }, [watchedValues])

  const onSubmit = async (data: UserRegistrationFormData) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // Simulate async request
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Log form data to console
      console.log('Form submitted successfully:', data)
      
      setSubmitSuccess(true)
      clearFormDataFromStorage()
      reset()
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const skillRatingValue = watch('skillRating') || 5

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form" noValidate>
        <h2>User Registration Form</h2>
        
        {submitSuccess && (
          <div className="success-message" role="alert">
            Registration completed successfully! Check the console for submitted data.
          </div>
        )}

        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend>Personal Information</legend>
          
          <div className="form-row">
            <FormField
              label="First Name"
              error={errors.firstName?.message}
              required
              htmlFor="firstName"
            >
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
            </FormField>

            <FormField
              label="Last Name"
              error={errors.lastName?.message}
              required
              htmlFor="lastName"
            >
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                placeholder="Enter your last name"
              />
            </FormField>
          </div>

          <FormField
            label="Email Address"
            error={errors.email?.message}
            required
            htmlFor="email"
          >
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="Enter your email address"
            />
          </FormField>

          <FormField
            label="Phone Number"
            error={errors.phone?.message}
            htmlFor="phone"
          >
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              placeholder="Enter your phone number (optional)"
            />
          </FormField>

          <FormField
            label="Date of Birth"
            error={errors.dateOfBirth?.message}
            required
            htmlFor="dateOfBirth"
          >
            <input
              {...register('dateOfBirth')}
              type="date"
              id="dateOfBirth"
            />
          </FormField>
        </fieldset>

        {/* Account Information Section */}
        <fieldset className="form-section">
          <legend>Account Information</legend>
          
          <FormField
            label="Username"
            error={errors.username?.message}
            required
            htmlFor="username"
          >
            <input
              {...register('username')}
              type="text"
              id="username"
              placeholder="Choose a username"
            />
          </FormField>

          <div className="form-row">
            <FormField
              label="Password"
              error={errors.password?.message}
              required
              htmlFor="password"
            >
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="Create a strong password"
              />
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              required
              htmlFor="confirmPassword"
            >
              <input
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </FormField>
          </div>
        </fieldset>
        {/* Preferences Section */}
        <fieldset className="form-section">
          <legend>Personal Preferences</legend>
          
          <FormField
            label="Gender"
            error={errors.gender?.message}
            required
            htmlFor="gender-group"
          >
            <div role="radiogroup" aria-labelledby="gender-group" id="gender-group">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div className="radio-group">
                    <CustomRadio
                      id="gender-male"
                      name={field.name}
                      value="male"
                      checked={field.value === 'male'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.gender ? 'gender-error' : undefined}
                      aria-invalid={!!errors.gender}
                    >
                      Male
                    </CustomRadio>
                    <CustomRadio
                      id="gender-female"
                      name={field.name}
                      value="female"
                      checked={field.value === 'female'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.gender ? 'gender-error' : undefined}
                      aria-invalid={!!errors.gender}
                    >
                      Female
                    </CustomRadio>
                    <CustomRadio
                      id="gender-other"
                      name={field.name}
                      value="other"
                      checked={field.value === 'other'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.gender ? 'gender-error' : undefined}
                      aria-invalid={!!errors.gender}
                    >
                      Other
                    </CustomRadio>
                    <CustomRadio
                      id="gender-prefer-not-to-say"
                      name={field.name}
                      value="prefer-not-to-say"
                      checked={field.value === 'prefer-not-to-say'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.gender ? 'gender-error' : undefined}
                      aria-invalid={!!errors.gender}
                    >
                      Prefer not to say
                    </CustomRadio>
                  </div>
                )}
              />
            </div>
          </FormField>

          <FormField
            label="Country"
            error={errors.country?.message}
            required
            htmlFor="country"
          >
            <select {...register('country')} id="country">
              <option value="">Select your country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Areas of Interest"
            error={errors.interests?.message}
            required
            htmlFor="interests-group"
          >
            <div id="interests-group" className="checkbox-group">
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <>
                    {INTERESTS.map(interest => (
                      <CustomCheckbox
                        key={interest}
                        id={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                        name={field.name}
                        value={interest}
                        checked={field.value?.includes(interest) || false}
                        onChange={(e) => {
                          const currentInterests = field.value || []
                          if (e.target.checked) {
                            field.onChange([...currentInterests, interest])
                          } else {
                            field.onChange(currentInterests.filter((i: string) => i !== interest))
                          }
                        }}
                        onBlur={field.onBlur}
                        aria-describedby={errors.interests ? 'interests-error' : undefined}
                        aria-invalid={!!errors.interests}
                      >
                        {interest}
                      </CustomCheckbox>
                    ))}
                  </>
                )}
              />
            </div>
          </FormField>

          <FormField
            label="Experience Level"
            error={errors.experienceLevel?.message}
            required
            htmlFor="experienceLevel-group"
          >
            <div role="radiogroup" aria-labelledby="experienceLevel-group" id="experienceLevel-group">
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <div className="radio-group">
                    <CustomRadio
                      id="experience-beginner"
                      name={field.name}
                      value="beginner"
                      checked={field.value === 'beginner'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.experienceLevel ? 'experienceLevel-error' : undefined}
                      aria-invalid={!!errors.experienceLevel}
                    >
                      Beginner
                    </CustomRadio>
                    <CustomRadio
                      id="experience-intermediate"
                      name={field.name}
                      value="intermediate"
                      checked={field.value === 'intermediate'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.experienceLevel ? 'experienceLevel-error' : undefined}
                      aria-invalid={!!errors.experienceLevel}
                    >
                      Intermediate
                    </CustomRadio>
                    <CustomRadio
                      id="experience-advanced"
                      name={field.name}
                      value="advanced"
                      checked={field.value === 'advanced'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-describedby={errors.experienceLevel ? 'experienceLevel-error' : undefined}
                      aria-invalid={!!errors.experienceLevel}
                    >
                      Advanced
                    </CustomRadio>
                  </div>
                )}
              />
            </div>
          </FormField>

          <FormField
            label={`Skill Rating: ${skillRatingValue}/10`}
            error={errors.skillRating?.message}
            required
            htmlFor="skillRating"
          >
            <input
              {...register('skillRating', { valueAsNumber: true })}
              type="range"
              id="skillRating"
              min="1"
              max="10"
              step="1"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={skillRatingValue}
              aria-valuetext={`${skillRatingValue} out of 10`}
            />
          </FormField>
        </fieldset>

        {/* Additional Information Section */}
        <fieldset className="form-section">
          <legend>Additional Information</legend>
          
          <FormField
            label="Bio (Optional)"
            error={errors.bio?.message}
            htmlFor="bio"
          >
            <textarea
              {...register('bio')}
              id="bio"
              rows={4}
              placeholder="Tell us a bit about yourself (max 500 characters)"
            />
          </FormField>
        </fieldset>

        {/* Agreements Section */}
        <fieldset className="form-section">
          <legend>Agreements</legend>
          
          <FormField
            label=""
            error={errors.agreeToTerms?.message}
            htmlFor="agreeToTerms"
          >
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="agreeToTerms"
                  name={field.name}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                  aria-invalid={!!errors.agreeToTerms}
                >
                  I agree to the <a href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> *
                </CustomCheckbox>
              )}
            />
          </FormField>

          <FormField
            label=""
            error={errors.subscribeNewsletter?.message}
            htmlFor="subscribeNewsletter"
          >
            <Controller
              name="subscribeNewsletter"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="subscribeNewsletter"
                  name={field.name}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                >
                  Subscribe to our newsletter for updates and tips
                </CustomCheckbox>
              )}
            />
          </FormField>
        </fieldset>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="submit-button"
            aria-describedby="submit-help"
          >
            {isSubmitting ? 'Submitting...' : 'Create Account'}
          </button>
          <div id="submit-help" className="submit-help">
            {!isValid && Object.keys(errors).length > 0 && 
              `Please fix the errors: ${Object.keys(errors).join(', ')}`}
            {!isValid && Object.keys(errors).length === 0 && 
              'Please fill in all required fields'}
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserRegistrationForm