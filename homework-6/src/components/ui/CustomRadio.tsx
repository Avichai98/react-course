import React from 'react'
import './CustomRadio.css'

interface CustomRadioProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  children: React.ReactNode
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

const CustomRadio: React.FC<CustomRadioProps> = ({
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
    <div className="custom-radio">
      <input
        type="radio"
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
      <label htmlFor={id} className="custom-radio__label">
        <span className="custom-radio__button" aria-hidden="true">
          <span className="custom-radio__dot" />
        </span>
        <span className="custom-radio__text">{children}</span>
      </label>
    </div>
  )
}

export default CustomRadio