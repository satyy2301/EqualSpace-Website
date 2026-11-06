'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ChevronDown, Loader2 } from 'lucide-react';
import { LotusFlower } from '@/components/ui/lotus-flower';
import {
  GENDER_OPTIONS,
  INTENTION_OPTIONS,
  INTEREST_OPTIONS,
  registrationSchema,
  type RegistrationField,
} from '@/lib/registration-schema';
import { ctaPrimary, fieldLabel } from '@/lib/styles';

type FormValues = {
  fullName: string;
  email: string;
  city: string;
  gender: string;
  interestedIn: string;
  relationshipIntention: string;
  isAdult: boolean;
  acceptedTerms: boolean;
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_VALUES: FormValues = {
  fullName: '',
  email: '',
  city: '',
  gender: '',
  interestedIn: '',
  relationshipIntention: '',
  isAdult: false,
  acceptedTerms: false,
};

const INPUT_CLASS =
  'w-full rounded-2xl border border-lotus-blush bg-lotus-white px-5 py-3.5 text-base text-lotus-brown placeholder:text-lotus-mauve/70 transition-all duration-300 hover:border-lotus-muted focus:border-lotus-mauve focus:outline-none focus:ring-4 focus:ring-lotus-petal aria-[invalid=true]:border-error-500 aria-[invalid=true]:bg-error-50';

function toPayload(values: FormValues) {
  return {
    fullName: values.fullName,
    email: values.email,
    city: values.city,
    gender: values.gender || undefined,
    interestedIn: values.interestedIn || undefined,
    relationshipIntention: values.relationshipIntention,
    isAdult: values.isAdult,
    acceptedTerms: values.acceptedTerms,
  };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm leading-snug text-error-700">
      {message}
    </p>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_CLASS} appearance-none pr-12 ${value ? '' : 'text-lotus-mauve'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-lotus-brown">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-lotus-plum" aria-hidden="true" />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<RegistrationField, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [bloom, setBloom] = useState(0);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => setBloom(1), 150);
    return () => window.clearTimeout(timer);
  }, [status]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key as RegistrationField]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = registrationSchema.safeParse(toPayload(values));
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        city: fieldErrors.city?.[0],
        gender: fieldErrors.gender?.[0],
        interestedIn: fieldErrors.interestedIn?.[0],
        relationshipIntention: fieldErrors.relationshipIntention?.[0],
        isAdult: fieldErrors.isAdult?.[0],
        acceptedTerms: fieldErrors.acceptedTerms?.[0],
      });
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data: unknown = await response.json().catch(() => null);
      const outcome =
        data && typeof data === 'object' && 'status' in data && typeof data.status === 'string' ? data.status : null;

      if (response.ok && outcome === 'success') {
        setStatus('success');
        return;
      }
      if (outcome === 'duplicate') {
        setErrors({ email: 'This email is already on the early access list.' });
      }
      const message =
        data && typeof data === 'object' && 'message' in data && typeof data.message === 'string'
          ? data.message
          : 'We could not save your registration. Please try again shortly.';
      setFormError(message);
      setStatus('error');
    } catch {
      setFormError('We could not reach EqualSpace. Check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center" role="status">
        <LotusFlower
          openness={bloom}
          className="h-40 w-40 drop-shadow-[0_20px_30px_rgba(114,84,93,0.2)] transition-all duration-1000 ease-out"
        />
        <h3 className="mt-8 animate-fade-up font-serif text-4xl font-medium text-lotus-brown sm:text-5xl">
          You&apos;re on the <span className="text-lotus-plum">list.</span>
        </h3>
        <p className="mt-5 max-w-sm animate-fade-up text-base leading-[1.75] text-lotus-plum" style={{ animationDelay: '200ms' }}>
          Something beautiful is unfolding. Welcome to EqualSpace.
        </p>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      {formError ? (
        <div role="alert" className="rounded-2xl border border-error-500/30 bg-error-50 px-5 py-4 text-sm leading-relaxed text-error-700">
          {formError}
        </div>
      ) : null}

      <div>
        <label htmlFor="fullName" className={fieldLabel}>
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => update('fullName', event.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className={INPUT_CLASS}
          placeholder="Your name"
        />
        <FieldError id="fullName-error" message={errors.fullName} />
      </div>

      <div>
        <label htmlFor="email" className={fieldLabel}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={INPUT_CLASS}
          placeholder="you@example.com"
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={fieldLabel}>
            City
          </label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update('city', event.target.value)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'city-error' : undefined}
            className={INPUT_CLASS}
            placeholder="Where you live"
          />
          <FieldError id="city-error" message={errors.city} />
        </div>

        <SelectField
          id="gender"
          label="Gender (optional)"
          value={values.gender}
          onChange={(value) => update('gender', value)}
          error={errors.gender}
          options={GENDER_OPTIONS}
          placeholder="Select one"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <SelectField
          id="interestedIn"
          label="Interested in meeting (optional)"
          value={values.interestedIn}
          onChange={(value) => update('interestedIn', value)}
          error={errors.interestedIn}
          options={INTEREST_OPTIONS}
          placeholder="Select one"
        />
        <SelectField
          id="relationshipIntention"
          label="What are you looking for?"
          value={values.relationshipIntention}
          onChange={(value) => update('relationshipIntention', value)}
          error={errors.relationshipIntention}
          options={INTENTION_OPTIONS}
          placeholder="Choose one"
        />
      </div>

      <div className="space-y-4 rounded-2xl bg-lotus-petal/50 p-5">
        <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-lotus-brown">
          <input
            type="checkbox"
            name="isAdult"
            checked={values.isAdult}
            onChange={(event) => update('isAdult', event.target.checked)}
            aria-invalid={Boolean(errors.isAdult)}
            aria-describedby={errors.isAdult ? 'isAdult-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-lotus-plum"
          />
          <span>I confirm that I am 18 years of age or older.</span>
        </label>
        <FieldError id="isAdult-error" message={errors.isAdult} />

        <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-lotus-brown">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={values.acceptedTerms}
            onChange={(event) => update('acceptedTerms', event.target.checked)}
            aria-invalid={Boolean(errors.acceptedTerms)}
            aria-describedby={errors.acceptedTerms ? 'acceptedTerms-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-lotus-plum"
          />
          <span>
            I accept the{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-lotus-mauve">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-lotus-mauve">
              Terms &amp; Conditions
            </Link>
            .
          </span>
        </label>
        <FieldError id="acceptedTerms-error" message={errors.acceptedTerms} />
      </div>

      <div className="pt-2">
        <button type="submit" disabled={submitting} className={`${ctaPrimary} w-full sm:w-auto`}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Reserving your place
            </>
          ) : (
            'Reserve my early access'
          )}
        </button>
        <p className="mt-5 text-sm leading-relaxed text-lotus-mauve">
          Your information is treated with care. No spam, just thoughtful updates.
        </p>
      </div>
    </form>
  );
}
