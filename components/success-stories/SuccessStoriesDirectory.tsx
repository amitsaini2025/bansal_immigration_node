'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ArrowRight, Calendar, X } from 'lucide-react';
import type { SuccessStoryRecord } from '@/lib/db';

interface SuccessStoriesDirectoryProps {
  initialStories: SuccessStoryRecord[];
}

function parseStoryDate(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 2) {
    const p = Date.parse(`${parts[0]} 1, ${parts[1]}`);
    if (!isNaN(p)) return p;
  }
  return 0;
}

export default function SuccessStoriesDirectory({ initialStories }: SuccessStoriesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title'>('recent');

  // Extract unique categories and years dynamically
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    initialStories.forEach((s) => {
      if (s.visa_type) catSet.add(s.visa_type.trim());
    });
    return Array.from(catSet).sort();
  }, [initialStories]);

  const years = useMemo(() => {
    const yearSet = new Set<string>();
    initialStories.forEach((s) => {
      if (s.date) {
        const match = s.date.match(/\b(20\d\d)\b/);
        if (match) yearSet.add(match[1]);
      }
    });
    return Array.from(yearSet).sort().reverse();
  }, [initialStories]);

  // Filter and sort stories instantly
  const filteredStories = useMemo(() => {
    return initialStories
      .filter((story) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (!story.visa_type || !story.visa_type.toLowerCase().includes(selectedCategory.toLowerCase())) {
            return false;
          }
        }

        // Year filter
        if (selectedYear !== 'all') {
          if (!story.date || !story.date.includes(selectedYear)) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = story.title.toLowerCase().includes(q);
          const matchClient = story.client_name && story.client_name.toLowerCase().includes(q);
          const matchExcerpt = story.excerpt && story.excerpt.toLowerCase().includes(q);
          const matchVisa = story.visa_type && story.visa_type.toLowerCase().includes(q);
          if (!matchTitle && !matchClient && !matchExcerpt && !matchVisa) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return parseStoryDate(b.date) - parseStoryDate(a.date);
        }
        if (sortBy === 'oldest') {
          return parseStoryDate(a.date) - parseStoryDate(b.date);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [initialStories, selectedCategory, selectedYear, searchQuery, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedYear !== 'all' || sortBy !== 'recent';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSortBy('recent');
  };

  return (
    <div>
      {/* Interactive Filter Control Bar */}
      <section className="bg-white border-b border-slate-200/90 py-5 sticky top-20 z-30 shadow-2xs">
        <div className="container mx-auto px-4 max-w-6xl space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, visa subclass, or keyword..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-700 focus:border-brand-700 focus:outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdowns: Visa Type, Year, Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Visa Type Dropdown */}
              <div className="min-w-[170px] flex-1 sm:flex-initial">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-700 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="all">All Visa Types</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Dropdown */}
              <div className="min-w-[120px]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-700 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="all">All Years</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      Year {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-700 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="recent">Most Recent First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between text-xs sm:text-sm text-slate-600">
          <p>
            Showing <strong className="text-slate-900">{filteredStories.length}</strong> of{' '}
            <strong className="text-slate-900">{initialStories.length}</strong> verified success stories
          </p>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Ordered by: <strong className="text-slate-700">{sortBy === 'recent' ? 'Most Recent' : sortBy === 'oldest' ? 'Oldest' : 'Title'}</strong>
          </span>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between border border-slate-200/90 group"
                >
                  <div>
                    {/* Top Thumbnail Image */}
                    <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
                      {story.image ? (
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 flex items-center justify-center p-6 text-center text-white font-bold text-base">
                          {story.title}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Top Row: Clean Visa Badge on Left, Date on Right (NO Success Stories pill) */}
                      <div className="flex items-center justify-between mb-3.5 gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-800 border border-brand-100/80">
                          {story.visa_type || 'Visa'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{story.date || '2025'}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2.5 line-clamp-2 group-hover:text-brand-800 transition-colors leading-snug">
                        <Link href={`/success-stories/${story.slug}`}>{story.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 mb-2 line-clamp-3 text-sm leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Client / Person + Read More */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 bg-brand-50 text-brand-800 rounded-full flex items-center justify-center shrink-0 border border-brand-100">
                        <User className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-[150px]">
                        {story.client_name}
                      </p>
                    </div>

                    <Link
                      href={`/success-stories/${story.slug}`}
                      className="text-brand-800 hover:text-brand-950 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs">
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="text-lg font-bold text-slate-900">No stories match your criteria</h3>
                <p className="text-slate-600 text-sm">
                  We couldn&apos;t find any stories matching your current selection. Try resetting filters or searching for another keyword.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 bg-brand-800 hover:bg-brand-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm inline-block transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
