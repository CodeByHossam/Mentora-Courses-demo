import React, { useId, useState, useEffect } from 'react';
import { validateField, sanitizeInput } from '../../utils/validation';

/**
 * Form input with inline validation. Errors are associated with the input for
 * assistive technology, and autocomplete is left to the caller/browser so
 * password managers keep working.
 */
const FormInput = ({
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  required = false,
  validationRules = {},
  className = '',
  disabled = false,
  autoComplete,
  helpText,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;

  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);
  const [sanitizedValue, setSanitizedValue] = useState(value || '');

  useEffect(() => {
    setSanitizedValue(value || '');
  }, [value]);

  const validateInput = (inputValue) => {
    const validation = validateField(name, inputValue, {
      required,
      ...validationRules,
    });
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleChange = (event) => {
    const sanitized = sanitizeInput(event.target.value, validationRules.allowHtml);
    setSanitizedValue(sanitized);

    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          name,
          value: sanitized,
        },
      });
    }

    if (touched) validateInput(sanitized);
  };

  const handleBlur = (event) => {
    setTouched(true);
    validateInput(sanitizedValue);
    if (onBlur) onBlur(event);
  };

  const hasErrors = errors.length > 0 && touched;
  const describedBy = [
    hasErrors ? errorId : null,
    helpText && !hasErrors ? helpId : null,
  ].filter(Boolean).join(' ') || undefined;

  const inputClasses = [
    'w-full rounded-md border px-3 py-2 text-base',
    'focus:outline-none focus:ring-2 transition-colors duration-150',
    hasErrors
      ? 'border-error focus:border-error focus:ring-error'
      : 'border-line focus:border-brand focus:ring-brand',
    disabled ? 'cursor-not-allowed bg-canvas text-ink-muted' : 'bg-white',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-ink-soft">
          {label}
          {required && <span className="ml-1 text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={sanitizedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasErrors || undefined}
          aria-describedby={describedBy}
          {...props}
        />

        {hasErrors && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-error" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {hasErrors && (
        <div id={errorId} role="alert" aria-live="polite" className="mt-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-error">{error}</p>
          ))}
        </div>
      )}

      {helpText && !hasErrors && (
        <p id={helpId} className="mt-1 text-sm text-ink-muted">{helpText}</p>
      )}
    </div>
  );
};

export default FormInput;
