---
name: react-forms
description: >-
  Build React forms with Formik and Yup (or React Hook Form + Zod): field
  management, validation, error display, async submit, and field arrays.
  Use when creating forms, adding validation, or handling submit errors.
  Trigger phrases: "build a form", "form validation", "Formik", "Yup schema",
  "React Hook Form", "field array", "async submit", "form errors".
---

# React Forms

Two solid approaches, both with schema validation:

- **Formik + Yup** — component-based, good for larger forms and teams that prefer JSX.
- **React Hook Form + Zod** — uncontrolled/ref-based, minimal re-renders, TypeScript-first.

Pick the one the project already uses; do not mix them in one app.

## When to use

- Creating any non-trivial form (login, signup, settings, multi-step).
- Adding validation rules and accessible error messages.
- Handling async submit, server-side field errors, and reset states.
- Trigger phrases: "build a form", "validate form", "Formik", "Yup",
  "React Hook Form", "Zod", "field array", "async submit", "server errors".

## Instructions

1. Define the validation schema first; it is the contract.
2. Keep field names identical between form, schema, and API payload.
3. Always render labels tied to inputs (`htmlFor`/`id`) and error text with `role="alert"`.
4. Show inline errors under the field, summary at the top for many errors.
5. Disable the submit button while submitting; show progress.
6. Map server validation errors back onto the right fields.
7. For dynamic lists, use Formik `FieldArray` / RHF `useFieldArray`.

### Formik + Yup

```jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Required'),
});

function LoginForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try { await onSubmit(values); }
      catch (err) { if (err.field) setFieldError(err.field, err.message); }
      finally { setSubmitting(false); }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" autoComplete="email"
        {...formik.getFieldProps('email')} aria-invalid={!!formik.errors.email} />
      {formik.touched.email && formik.errors.email && (
        <p role="alert">{formik.errors.email}</p>
      )}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" autoComplete="current-password"
        {...formik.getFieldProps('password')} />
      {formik.touched.password && formik.errors.password && (
        <p role="alert">{formik.errors.password}</p>
      )}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
```

### React Hook Form + Zod

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
});
type FormValues = z.infer<typeof schema>;

function LoginForm({ onSubmit }: { onSubmit: (v: FormValues) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" {...register('email')} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...register('password')} />
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <button disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
```

### Field array (dynamic rows)

```jsx
// Formik
<FieldArray name="contacts">
  {({ push, remove, form }) => (
    <>
      {form.values.contacts.map((_, i) => (
        <div key={i}>
          <Field name={`contacts.${i}.email`} />
          <button type="button" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => push({ email: '' })}>Add</button>
    </>
  )}
</FieldArray>
```

## Examples

### Good — schema-driven, accessible errors

```jsx
<input id="email" aria-invalid={!!errors.email} aria-describedby="email-err" {...register('email')} />
{errors.email && <p id="email-err" role="alert">{errors.email.message}</p>}
```

### Bad — no validation, unlabeled, uncontrolled mixing

```jsx
<input onChange={e => values.email = e.target.value} />   // mutates, no label, no errors
<form onSubmit={() => api.post('/login', values)}>         // no preventDefault, no pending state
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Validating on every keystroke for required fields | Noisy errors | Validate on blur/submit |
| Duplicating schema in TS + Yup | Drift | Derive types from schema |
| Missing `<label htmlFor>` | Inaccessible | Associate label + input |
| No submit pending state | Double submits | Disable while submitting |
| Ignoring server errors | Silent failures | Map to fields |
| Storing form state in Redux | Churn, boilerplate | Keep local (Formik/RHF) |
| `key={index}` on field arrays | Wrong values on reorder/remove | Stable id per row |

## Related skills

- `frontend/react-component-patterns`, `design/accessibility-wcag`,
  `state/mern-data-state-decisions`, `frontend/axios-http-patterns`.
