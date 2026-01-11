import { UserRegistrationFormData } from '../schemas/userRegistrationSchema'

const FORM_DATA_KEY = 'userRegistrationFormData'

// Fields that should NOT be stored in localStorage for security reasons
const SENSITIVE_FIELDS = ['password', 'confirmPassword']

export const saveFormDataToStorage = (data: Partial<UserRegistrationFormData>) => {
  try {
    // Filter out sensitive data
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (!SENSITIVE_FIELDS.includes(key)) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, unknown>)

    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(filteredData))
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error)
  }
}

export const loadFormDataFromStorage = (): Partial<UserRegistrationFormData> => {
  try {
    const storedData = localStorage.getItem(FORM_DATA_KEY)
    if (storedData) {
      return JSON.parse(storedData) as Partial<UserRegistrationFormData>
    }
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error)
  }
  return {}
}

export const clearFormDataFromStorage = () => {
  try {
    localStorage.removeItem(FORM_DATA_KEY)
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error)
  }
}