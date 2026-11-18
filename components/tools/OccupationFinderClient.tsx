'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  Loader2,
  Check,
  ExternalLink,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { PageHero, container, card, cardPad, btnPrimaryLight, focusRing } from '@/components/ui/brand';

interface VisaOption {
  visa_type: string;
  visa_name: string;
  eligibility: boolean;
  MLTSSL: boolean;
  STSOL: boolean;
  ROL: boolean;
  CSOL: boolean;
  permanent_visa: boolean;
  dha_path: string;
}

interface Occupation {
  anzsco_code: string;
  occupation_title: string;
  list_label?: string | null;
  assessing_authority?: string | null;
  skill_level?: number | null;
  is_csol?: boolean;
  visa_options: Record<string, VisaOption>;
}

const DHA_BASE = 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing';

const POPULAR_OCCUPATIONS = [
  { code: '261399', title: 'Software & App Programmers nec', authority: 'ACS', list: 'MLTSSL' },
  { code: '261313', title: 'Software Engineer', authority: 'ACS', list: 'MLTSSL' },
  { code: '254499', title: 'Registered Nurse nec', authority: 'ANMAC', list: 'MLTSSL' },
  { code: '221111', title: 'Accountant (General)', authority: 'CPA/CA/IPA', list: 'MLTSSL' },
  { code: '233211', title: 'Civil Engineer', authority: 'EA', list: 'MLTSSL' },
  { code: '351311', title: 'Chef', authority: 'TRA', list: 'MLTSSL' },
  { code: '241111', title: 'Early Childhood Teacher', authority: 'AITSL', list: 'MLTSSL' },
  { code: '321211', title: 'Motor Mechanic (General)', authority: 'TRA', list: 'MLTSSL' },
];

export default function OccupationFinderClient() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Occupation[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | null>(null);
  const [searchResults, setSearchResults] = useState<Occupation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MLTSSL' | 'STSOL' | 'ROL' | 'CSOL'>('ALL');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial occupation or handle ?q= from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      executeSearch(q, true);
    } else {
      // Preload 261399 as default showcase so user immediately sees rich data
      loadOccupationByCode('261399');
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadOccupationByCode = async (code: string) => {
    try {
      const res = await fetch(`/api/public/anzsco/search?q=${encodeURIComponent(code)}&limit=1`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSelectedOccupation(data.data[0]);
      }
    } catch {
      // Ignore
    }
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    setErrorMsg('');

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/public/anzsco/search?q=${encodeURIComponent(val)}&limit=10`);
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            setSuggestions(data.data);
            setSuggestionsOpen(true);
          } else {
            setSuggestions([]);
          }
        } catch {
          setSuggestions([]);
        }
      }, 200);
    } else {
      setSuggestions([]);
      setSuggestionsOpen(false);
    }
  };

  const executeSearch = async (searchTerm: string, autoSelectFirst = false) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setErrorMsg('Please enter at least 2 characters to search.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setSuggestionsOpen(false);

    try {
      const res = await fetch(`/api/public/anzsco/search?q=${encodeURIComponent(searchTerm)}&limit=50`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSearchResults(data.data);
        if (autoSelectFirst || data.data.length === 1) {
          setSelectedOccupation(data.data[0]);
        }
      } else {
        setSearchResults([]);
        setSelectedOccupation(null);
      }
      setHasSearched(true);
    } catch {
      setSearchResults([]);
      setSelectedOccupation(null);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOccupation = (occ: Occupation) => {
    setSelectedOccupation(occ);
    setSuggestionsOpen(false);
    setSearchResults([]);
    setHasSearched(false);
    setQuery(`${occ.anzsco_code}: ${occ.occupation_title}`);

    // Smooth scroll to the detail panel
    const el = document.getElementById('occupation-detail-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setSuggestionsOpen(false);
    setSearchResults([]);
    setHasSearched(false);
    setErrorMsg('');
  };

  const filteredResults = searchResults.filter((occ) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MLTSSL') return occ.list_label === 'MLTSSL';
    if (activeFilter === 'STSOL') return occ.list_label === 'STSOL';
    if (activeFilter === 'ROL') return occ.list_label === 'ROL';
    if (activeFilter === 'CSOL') return Boolean(occ.is_csol);
    return true;
  });

  // Keyboard support for the suggestion list (accessibility only; search logic unchanged).
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && suggestionsOpen && suggestions.length > 0) {
      e.preventDefault();
      (listRef.current?.querySelector('button') as HTMLButtonElement | null)?.focus();
    } else if (e.key === 'Escape') {
      setSuggestionsOpen(false);
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
      setSuggestionsOpen(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div>
      <PageHero
        badge="Skilled migration tool"
        title="Skilled Occupation List Finder: Search Your ANZSCO Occupation"
        intro="Search the occupation database to find your ANZSCO code, the assessing authority for your job, and the skilled visas the occupation may be eligible for. Type your job title and choose the closest match."
        below={
          <div className="max-w-3xl mt-10" ref={searchWrapperRef}>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                executeSearch(query);
              }}
              className="bg-white p-3 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-3 relative z-20"
            >
              <div className="relative flex-1">
                <label htmlFor="occupation-search" className="sr-only">
                  Occupation title or 6-digit ANZSCO code
                </label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  ref={inputRef}
                  id="occupation-search"
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Job title or 6-digit ANZSCO, e.g. Software, 261399, Nurse"
                  autoComplete="off"
                  aria-controls="occupation-suggestions"
                  aria-expanded={suggestionsOpen && suggestions.length > 0}
                  className="w-full min-h-12 pl-12 pr-12 py-3 text-slate-900 placeholder:text-slate-500 text-base rounded-xl border border-transparent focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/25 transition"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer ${focusRing}`}
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}

                {suggestionsOpen && suggestions.length > 0 && (
                  <div
                    id="occupation-suggestions"
                    ref={listRef}
                    onKeyDown={handleListKeyDown}
                    className="absolute left-0 right-0 top-full mt-3 bg-white rounded-xl border border-slate-200 shadow-xl max-h-80 overflow-y-auto z-50 divide-y divide-slate-100 text-left"
                  >
                    {suggestions.map((occ) => (
                      <button
                        key={occ.anzsco_code}
                        type="button"
                        onClick={() => handleSelectOccupation(occ)}
                        className="w-full min-h-14 px-4 sm:px-5 py-3 hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-base leading-snug">{occ.occupation_title}</div>
                          <div className="text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                            <span className="font-bold text-brand-800">ANZSCO {occ.anzsco_code}</span>
                            {occ.list_label && (
                              <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-900 font-bold text-xs">{occ.list_label}</span>
                            )}
                          </div>
                        </div>
                        {occ.assessing_authority && (
                          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                            {occ.assessing_authority}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} className={`${btnPrimaryLight} whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60`}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" aria-hidden="true" />
                    Search
                  </>
                )}
              </button>
            </form>

            {errorMsg && (
              <p role="alert" className="mt-3 text-sm text-red-800 font-medium bg-red-50 py-2.5 px-4 rounded-lg border border-red-200">
                {errorMsg}
              </p>
            )}

            <div className="mt-6">
              <p className="text-sm text-slate-600 font-semibold mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_OCCUPATIONS.map((pop) => (
                  <button
                    key={pop.code}
                    type="button"
                    onClick={() => {
                      setQuery(`${pop.code}: ${pop.title}`);
                      loadOccupationByCode(pop.code);
                    }}
                    className="min-h-10 px-4 py-2 rounded-full bg-white border border-slate-300 hover:bg-brand-700 hover:border-brand-700 hover:text-white text-brand-900 text-sm font-semibold border border-white/25 transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                  >
                    <span>{pop.title}</span>
                    <span className="opacity-80 text-xs">({pop.code})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200" id="occupation-detail-section" aria-live="polite">
        <div className={container}>
          {selectedOccupation && (
            <div className={`${card} ${cardPad} lg:p-8 mb-10`}>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                  {selectedOccupation.anzsco_code}: {selectedOccupation.occupation_title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedOccupation.skill_level && (
                    <span className="bg-brand-900 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                      Skill Level {selectedOccupation.skill_level}
                    </span>
                  )}
                  {selectedOccupation.assessing_authority && (
                    <span className="border border-slate-300 text-slate-800 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                      Assessed by {selectedOccupation.assessing_authority}
                    </span>
                  )}
                  {selectedOccupation.list_label && (
                    <span className="border border-brand-100 text-brand-900 bg-brand-50 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                      {selectedOccupation.list_label}
                    </span>
                  )}
                  {selectedOccupation.is_csol && (
                    <span className="border border-slate-200 text-slate-700 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">
                      CSOL
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Possible visa options</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Visa names follow Australian Government subclasses. Eligibility and list columns reflect data we hold. Confirm with the Department of Home Affairs.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl" tabIndex={0} role="region" aria-label="Visa options table, scrolls sideways on small screens">
                <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wide">
                      <th scope="col" className="py-3.5 px-4">Visa type</th>
                      <th scope="col" className="py-3.5 px-4 text-center">Eligibility</th>
                      <th scope="col" className="py-3.5 px-4 text-center">MLTSSL</th>
                      <th scope="col" className="py-3.5 px-4 text-center">STSOL</th>
                      <th scope="col" className="py-3.5 px-4 text-center">ROL</th>
                      <th scope="col" className="py-3.5 px-4 text-center">CSOL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {Object.entries(selectedOccupation.visa_options || {}).map(([key, opt]) => (
                      <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center min-w-8 h-8 px-1.5 rounded-full bg-brand-900 text-white text-xs font-bold shrink-0">
                              {opt.visa_type}
                            </span>
                            <div>
                              <a
                                href={`${DHA_BASE}${opt.dha_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-semibold text-slate-900 hover:text-brand-800 transition inline-flex items-center gap-1 rounded ${focusRing}`}
                              >
                                {opt.visa_name}
                                <ExternalLink className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                                <span className="sr-only">(opens in a new tab)</span>
                              </a>
                              {opt.permanent_visa && (
                                <span className="block w-fit bg-brand-50 text-brand-900 border border-brand-100 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase mt-1">
                                  Permanent visa
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        {[opt.eligibility, opt.MLTSSL, opt.STSOL, opt.ROL, opt.CSOL].map((v, ci) => (
                          <td key={ci} className="py-3.5 px-4 text-center">
                            {v ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-900 text-white">
                                <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
                                <span className="sr-only">Yes</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 text-slate-500">
                                <X className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                                <span className="sr-only">No</span>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-brand-50 border border-brand-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="max-w-2xl">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    Check your duties against ANZSCO {selectedOccupation.anzsco_code}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Our registered migration agents can compare your duties and evidence with this occupation and explain the next steps with{' '}
                    <span className="font-semibold text-slate-800">{selectedOccupation.assessing_authority || 'the assessing authority'}</span>.
                  </p>
                </div>
                <Link href="/book-an-appointment" className={`${btnPrimaryLight} shrink-0`}>
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Search results for &quot;{query}&quot;</h2>
                  <p className="text-sm text-slate-600 mt-1">Found {searchResults.length} matching ANZSCO occupations</p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 w-fit" role="group" aria-label="Filter by occupation list">
                  {(['ALL', 'MLTSSL', 'STSOL', 'ROL', 'CSOL'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={activeFilter === filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`min-h-10 px-4 rounded-lg text-sm font-semibold transition cursor-pointer ${focusRing} ${
                        activeFilter === filter ? 'bg-brand-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredResults.map((occ) => (
                  <div key={occ.anzsco_code} className={`${card} p-6 hover:border-brand-300 flex flex-col`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-brand-900 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                        ANZSCO {occ.anzsco_code}
                      </span>
                      {occ.list_label && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {occ.list_label}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug">{occ.occupation_title}</h3>

                    <div className="space-y-1 text-sm text-slate-600 mb-5">
                      {occ.assessing_authority && (
                        <div>
                          <span className="font-semibold text-slate-800">Authority:</span> {occ.assessing_authority}
                        </div>
                      )}
                      {occ.skill_level && (
                        <div>
                          <span className="font-semibold text-slate-800">Skill level:</span> {occ.skill_level}
                        </div>
                      )}
                      {occ.is_csol && (
                        <span className="inline-block mt-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                          CSOL eligible (subclass 482)
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectOccupation(occ)}
                      className={`mt-auto w-full min-h-12 bg-slate-50 hover:bg-brand-900 hover:text-white text-brand-900 font-bold text-sm rounded-xl transition-colors border border-slate-200 hover:border-brand-900 flex items-center justify-center gap-1.5 cursor-pointer ${focusRing}`}
                    >
                      View visa options
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasSearched && searchResults.length === 0 && !selectedOccupation && (
            <div className={`${card} p-10 sm:p-12 text-center`}>
              <Compass className="w-12 h-12 text-slate-400 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">No matching occupations found</h2>
              <p className="text-slate-600 text-base max-w-md mx-auto mb-6">
                We could not find an occupation matching &quot;{query}&quot;. Try a broader title (for example &quot;Developer&quot;, &quot;Nurse&quot; or &quot;Engineer&quot;) or a 6-digit ANZSCO code.
              </p>
              <button type="button" onClick={clearSearch} className={`${btnPrimaryLight} cursor-pointer`}>
                Reset search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
