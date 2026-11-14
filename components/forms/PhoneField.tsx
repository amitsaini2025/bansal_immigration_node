'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  PHONE_COUNTRIES,
  cleanDigits,
  countryByDial,
  countryByIso,
  formatNational,
  guessIsoFromBrowser,
} from '@/components/forms/phoneData';

interface PhoneFieldProps {
  /** Dial code held by the parent form, e.g. "+61". */
  dial: string;
  onDialChange: (dial: string) => void;
  /** National number as shown in the box, e.g. "412 345 678". */
  value: string;
  onValueChange: (value: string) => void;
  id: string;
  required?: boolean;
  selectClassName?: string;
  inputClassName?: string;
  /** Guess the country from the visitor's location. Default true. */
  autoDetect?: boolean;
}

/**
 * Phone input with a country picker. The country is guessed from the visitor's location
 * (hosting headers via /api/geo, then browser time zone) and can always be changed.
 * The box formats the number to the pattern of the chosen country.
 */
export default function PhoneField({
  dial,
  onDialChange,
  value,
  onValueChange,
  id,
  required,
  selectClassName = '',
  inputClassName = '',
  autoDetect = true,
}: PhoneFieldProps) {
  const [iso, setIso] = useState(() => countryByDial(dial).iso);
  const touched = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const country = useMemo(() => countryByIso(iso), [iso]);

  // Keep in step if the parent changes the dial code (for example after a reset).
  useEffect(() => {
    if (countryByIso(iso).dial !== dial) setIso(countryByDial(dial).iso);
  }, [dial, iso]);

  // Detect the visitor's country once.
  useEffect(() => {
    if (!autoDetect) return;
    let cancelled = false;
    const apply = (code: string | null) => {
      if (cancelled || touched.current || !code) return;
      const c = PHONE_COUNTRIES.find((x) => x.iso === code);
      if (!c) return;
      setIso(c.iso);
      onDialChange(c.dial);
    };
    fetch('/api/geo', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => apply(d?.country || guessIsoFromBrowser()))
      .catch(() => apply(guessIsoFromBrowser()));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDetect]);

  const digits = value.replace(/\D/g, '');
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.setCustomValidity(
      digits.length > 0 && digits.length < country.min
        ? `Enter a valid ${country.name} number, for example ${country.example}.`
        : '',
    );
  }, [digits, country]);

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    touched.current = true;
    const c = countryByIso(e.target.value);
    setIso(c.iso);
    onDialChange(c.dial);
    onValueChange(formatNational(cleanDigits(value, c), c));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(formatNational(cleanDigits(e.target.value, country), country));
  };

  return (
    <div className="flex gap-2">
      <select
        value={iso}
        onChange={handleCountry}
        aria-label="Country code"
        className={`shrink-0 cursor-pointer ${selectClassName}`}
      >
        {PHONE_COUNTRIES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.flag} {c.iso} {c.dial}
          </option>
        ))}
      </select>
      <input
        ref={inputRef}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        value={value}
        onChange={handleInput}
        placeholder={country.example}
        className={`min-w-0 ${inputClassName}`}
      />
    </div>
  );
}
