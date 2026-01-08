import React from 'react'
import './CustomCheckbox.css'

interface CustomCheckboxProps {
  id: string
  name: string
  value?: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  children: React.ReactNode
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  onBlur,
  children,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid
}) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="visually-hidden"
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
      />
      <label htmlFor={id} className="custom-checkbox__label">
        <span className="custom-checkbox__box" aria-hidden="true">
          <svg 
            className="custom-checkbox__checkmark" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </span>
        <span className="custom-checkbox__text">{children}</span>
      </label>
    </div>
  )
}

export default CustomCheckbox