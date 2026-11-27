/**
 * Static class maps for dynamic colors. Tailwind cannot see classes built with
 * string interpolation, so callers must select from these complete strings.
 */
const COLOR_TO_TONE = {
  blue: 'info',
  green: 'success',
  emerald: 'success',
  teal: 'success',
  yellow: 'warning',
  amber: 'warning',
  orange: 'warning',
  red: 'error',
  rose: 'error',
  gray: 'neutral',
  slate: 'neutral',
  indigo: 'brand',
  purple: 'brand',
  violet: 'brand',
  pink: 'brand',
  cyan: 'brand',
  sky: 'brand',
};

const TONES = {
  brand: {
    borderLeft: 'border-brand',
    solid: 'bg-brand',
    soft: 'bg-brand-soft',
    softHover: 'group-hover:bg-brand-200',
    icon: 'text-brand',
    text: 'text-brand-700',
    textStrong: 'text-brand-800',
    label: 'text-brand-700 bg-brand-50',
    badge: 'bg-brand-100 text-brand-800',
    hoverBorder: 'hover:border-brand-300',
  },
  success: {
    borderLeft: 'border-success',
    solid: 'bg-success',
    soft: 'bg-success-soft',
    softHover: 'group-hover:bg-success-soft',
    icon: 'text-success-dark',
    text: 'text-success-dark',
    textStrong: 'text-success-dark',
    label: 'text-success-dark bg-success-soft',
    badge: 'bg-success-soft text-success-dark',
    hoverBorder: 'hover:border-success',
  },
  warning: {
    borderLeft: 'border-warning',
    solid: 'bg-warning',
    soft: 'bg-warning-soft',
    softHover: 'group-hover:bg-warning-soft',
    icon: 'text-warning-dark',
    text: 'text-warning-dark',
    textStrong: 'text-warning-dark',
    label: 'text-warning-dark bg-warning-soft',
    badge: 'bg-warning-soft text-warning-dark',
    hoverBorder: 'hover:border-warning',
  },
  error: {
    borderLeft: 'border-error',
    solid: 'bg-error',
    soft: 'bg-error-soft',
    softHover: 'group-hover:bg-error-soft',
    icon: 'text-error-dark',
    text: 'text-error-dark',
    textStrong: 'text-error-dark',
    label: 'text-error-dark bg-error-soft',
    badge: 'bg-error-soft text-error-dark',
    hoverBorder: 'hover:border-error',
  },
  info: {
    borderLeft: 'border-info',
    solid: 'bg-info',
    soft: 'bg-info-soft',
    softHover: 'group-hover:bg-info-soft',
    icon: 'text-info-dark',
    text: 'text-info-dark',
    textStrong: 'text-info-dark',
    label: 'text-info-dark bg-info-soft',
    badge: 'bg-info-soft text-info-dark',
    hoverBorder: 'hover:border-info',
  },
  neutral: {
    borderLeft: 'border-line',
    solid: 'bg-ink-soft',
    soft: 'bg-canvas',
    softHover: 'group-hover:bg-line',
    icon: 'text-ink-soft',
    text: 'text-ink-soft',
    textStrong: 'text-ink',
    label: 'text-ink-soft bg-canvas',
    badge: 'bg-canvas text-ink-soft',
    hoverBorder: 'hover:border-ink-muted',
  },
};

export const getToneClasses = (color = 'brand') =>
  TONES[COLOR_TO_TONE[color] || color] || TONES.brand;

export default getToneClasses;
