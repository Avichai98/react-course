import React from 'react'
import './FormField.css'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  htmlFor?: string
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required = false, 
  children, 
  htmlFor 
}) => {
  const errorId = error ? `${htmlFor}-error` : undefined

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label htmlFor={htmlFor} className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-label="required">*</span>}
      </label>
      <div className="form-field__input-wrapper">
        {React.cloneElement(children as React.ReactElement, {
          'aria-describedby': errorId,
          'aria-invalid': !!error
        })}
      </div>
      {error && (
        <div 
          id={errorId} 
          className="form-field__error" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default FormField