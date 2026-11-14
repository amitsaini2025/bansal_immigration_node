"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
    role: "Father of the Nation",
  },
  {
    text: "Excellence is a continuous process and not an accident.",
    author: "Dr. A.P.J. Abdul Kalam",
    role: "Former President of India",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    role: "Former Prime Minister of the United Kingdom",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    role: "Humanitarian & Diplomat",
  },
  {
    text: "Nothing is impossible, the word itself says 'I'm possible'!",
    author: "Audrey Hepburn",
    role: "Actress and Humanitarian",
  },
];

export default function QuotesSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-brand-50/70 via-white to-brand-50/50 rounded-3xl p-8 md:p-14 shadow-xl border border-brand-100/60 overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-48 h-48 bg-brand-200/20 rounded-full blur-3xl -translate-x-20 -translate-y-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-200/20 rounded-full blur-3xl translate-x-20 translate-y-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Quote className="w-12 h-12 text-brand-300 mx-auto mb-6 opacity-60" />
        
        <div className="min-h-[160px] flex flex-col justify-center transition-all duration-700">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#26253a] mb-5 leading-tight">
            &ldquo;{quotes[current].text}&rdquo;
          </blockquote>
          <cite className="text-base text-gray-700 font-semibold not-italic">
            — {quotes[current].author},{" "}
            <span className="text-gray-500 font-normal">{quotes[current].role}</span>
          </cite>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-8 bg-brand-700"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
