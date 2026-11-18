'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle2, AlertTriangle, HelpCircle, MapPin, GraduationCap, Award, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { PageHero, container, card, btnPrimaryLight, linkText } from '@/components/ui/brand';

interface PostcodeResult {
  suburb: string;
  postcode: string;
  state: string;
  category: string;
  regional: boolean;
}

interface PostcodeSuggestion {
  suburb: string;
  postcode: string;
  state: string;
}

const POPULAR_SEARCHES = [
  { label: 'Geelong, VIC', code: '3220' },
  { label: 'Gold Coast, QLD', code: '4217' },
  { label: 'Adelaide, SA', code: '5000' },
  { label: 'Newcastle, NSW', code: '2300' },
  { label: 'Hobart, TAS', code: '7000' },
  { label: 'Melbourne CBD, VIC', code: '3000' },
];

export default function PostcodeCheckerClient() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PostcodeSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PostcodeResult[] | null>(null);
  const [notFoundQuery, setNotFoundQuery] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/postcode/suggest?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setSuggestions(data);
            setShowSuggestions(true);
          }
        }
      } catch {
        // silently ignore suggestion errors
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectSuggestion = (item: PostcodeSuggestion) => {
    setQuery(`${item.suburb} ${item.postcode}`);
    setShowSuggestions(false);
    handleCheck(`${item.postcode}`);
  };

  const handleCheck = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setResults(null);
    setNotFoundQuery(null);
    setNetworkError(null);
    setShowSuggestions(false);

    try {
      const res = await fetch(`/api/postcode/check?search=${encodeURIComponent(searchVal.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else {
          setNotFoundQuery(searchVal);
        }
      } else {
        setNetworkError('We could not complete your search due to a server connection error. Please try again.');
      }
    } catch {
      setNetworkError('A network error occurred. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Keyboard support for the suggestion list (visual/a11y only; lookup logic unchanged).
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      (listRef.current?.querySelector('button') as HTMLButtonElement | null)?.focus();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(listRef.current?.querySelectorAll('button') ?? []) as HTMLButtonElement[];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[Math.min(i + 1, items.length - 1)]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (i <= 0) inputRef.current?.focus();
      else items[i - 1]?.focus();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheck(query);
  };

  return (
    <div>
      <PageHero
        badge="Regional migration tool"
        title="Designated Regional Postcode Checker"
        intro="Find out whether a place in Australia counts as a designated regional area. The answer affects which visas you can apply for, how long some visas last, and whether you can claim extra study points. Type a postcode or pick an example."
        below={
          <div className="max-w-3xl mt-10" ref={suggestionsRef}>
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl shadow-lg">
              <div className="relative flex-1">
                <label htmlFor="postcode" className="sr-only">
                  Suburb name or 4-digit postcode
                </label>
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  id="postcode"
                  name="postcode"
                  placeholder="Enter a suburb or 4-digit postcode, e.g. Geelong or 3220"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleInputKeyDown}
                  aria-controls="postcode-suggestions"
                  aria-expanded={showSuggestions && suggestions.length > 0}
                  className="w-full min-h-12 pl-12 pr-4 py-3 bg-white text-slate-900 rounded-xl text-base placeholder:text-slate-500 border border-transparent focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/25"
                  required
                  autoComplete="off"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div
                    id="postcode-suggestions"
                    className="absolute left-0 right-0 top-full mt-3 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-left"
                  >
                    <div className="px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                      Matching locations
                    </div>
                    <div
                      ref={listRef}
                      onKeyDown={handleListKeyDown}
                      className="max-h-60 overflow-y-auto divide-y divide-slate-100"
                    >
                      {suggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSuggestion(item)}
                          className="w-full min-h-12 px-4 py-3 text-left hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span className="font-semibold text-slate-900">{item.suburb}</span>
                          <span className="inline-flex items-center text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded shrink-0">
                            {item.postcode}, {item.state}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} className={`${btnPrimaryLight} whitespace-nowrap cursor-pointer disabled:opacity-60`}>
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" aria-hidden="true" />
                    Check Postcode
                  </>
                )}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-5 text-sm">
              <span className="text-slate-600 font-semibold mr-1">Quick examples:</span>
              {POPULAR_SEARCHES.map((chip) => (
                <button
                  key={chip.code}
                  type="button"
                  onClick={() => {
                    setQuery(`${chip.label}`);
                    handleCheck(chip.code);
                  }}
                  className="min-h-10 px-4 py-2 rounded-full bg-white hover:bg-brand-700 hover:border-brand-700 hover:text-white border border-slate-300 text-brand-900 font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {/* Results / status area (always mounted so screen readers announce changes) */}
      <div aria-live="polite">
        {(networkError || notFoundQuery || (results && results.length > 0)) && (
          <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
            <div className={container}>
              <div className="max-w-4xl">
                {networkError && (
                  <div role="alert" className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 text-red-900">
                    <AlertTriangle className="w-6 h-6 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-2 flex-1">
                      <h2 className="font-bold text-lg text-red-900">Connection error</h2>
                      <p className="text-base text-red-800">{networkError}</p>
                      <button
                        type="button"
                        onClick={() => handleCheck(query)}
                        className="inline-flex items-center gap-1.5 min-h-12 text-sm font-semibold text-red-800 hover:text-red-950 underline cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" aria-hidden="true" /> Retry now
                      </button>
                    </div>
                  </div>
                )}

                {notFoundQuery && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 text-amber-900">
                    <HelpCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-2">
                      <h2 className="font-bold text-lg text-amber-900">Postcode or suburb not found</h2>
                      <p className="text-base text-amber-900">
                        We could not find any records for &ldquo;<span className="font-semibold">{notFoundQuery}</span>&rdquo; in the designated regional database.
                      </p>
                      <p className="text-sm text-amber-900">
                        Tip: try typing the 4-digit postcode directly (for example &ldquo;3220&rdquo; or &ldquo;4217&rdquo;) or check the spelling.
                      </p>
                    </div>
                  </div>
                )}

                {results && results.length > 0 && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-200">
                      <h2 className="text-xl font-bold text-slate-900">
                        Found {results.length} location{results.length > 1 ? 's' : ''}
                      </h2>
                      <span className="text-sm font-semibold text-slate-600">Department of Home Affairs classification</span>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {results.map((item, idx) => (
                        <div
                          key={idx}
                          className={`${card} border-l-4 p-6 sm:p-7 ${item.regional ? 'border-l-brand-700' : 'border-l-slate-400'}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{item.suburb}</span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800">
                                  {item.postcode} &bull; {item.state}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                {item.regional ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-900 border border-brand-100">
                                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                    Regional area (qualifies for regional benefits)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                                    <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                                    Metropolitan (Category 1 major city)
                                  </span>
                                )}
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{item.category}</span>
                              </div>
                            </div>

                            <div className="sm:text-right shrink-0">
                              {item.regional ? (
                                <div className="bg-brand-50 p-4 rounded-xl border border-brand-100">
                                  <div className="text-xs font-semibold text-slate-600">Regional visa benefits</div>
                                  <div className="text-sm font-bold text-brand-900 mt-0.5">+5 study points / +15 subclass 491</div>
                                </div>
                              ) : (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                  <div className="text-xs font-semibold text-slate-600">Metropolitan status</div>
                                  <div className="text-sm font-bold text-slate-800 mt-0.5">Standard points only</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <GraduationCap className="w-4 h-4 text-brand-800" aria-hidden="true" />
                                Regional study points
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {item.regional
                                  ? '5 bonus points if you live & study full-time for 2+ academic years in this area.'
                                  : 'No regional study bonus points apply for metropolitan Category 1.'}
                              </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <Award className="w-4 h-4 text-brand-800" aria-hidden="true" />
                                Subclass 491 and 494
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {item.regional
                                  ? 'Eligible for 491 regional nomination (+15 points) and Employer Sponsored 494.'
                                  : 'Ineligible for regional work or residency visa subclasses.'}
                              </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <ShieldCheck className="w-4 h-4 text-brand-800" aria-hidden="true" />
                                Subclass 191 PR pathway
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {item.regional
                                  ? 'Counts toward the 3-year living requirement for permanent residence Subclass 191.'
                                  : 'Metropolitan living cannot count toward the 491-to-191 permanent transition.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">
                      Next step: add regional points in the{' '}
                      <Link href="/migrate-to-australia/pr-point-calculator" className={linkText}>PR Points Calculator</Link>, or{' '}
                      <Link href="/book-an-appointment" className={linkText}>book a consultation</Link>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
