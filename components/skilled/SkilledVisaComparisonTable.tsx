'use client';

import React from 'react';
import { Check, X, Shield, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SkilledVisaComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-gray-200">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/80">
            <th className="p-4 md:p-6 text-sm font-bold text-gray-900 w-1/4">Key Features</th>
            <th className="p-4 md:p-6 text-sm font-bold text-brand-950 w-1/4 bg-brand-50/50">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-800" />
                <span>Subclass 189</span>
              </div>
              <div className="text-xs font-normal text-gray-500 mt-1">Skilled Independent</div>
            </th>
            <th className="p-4 md:p-6 text-sm font-bold text-brand-950 w-1/4 bg-brand-50/40">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-800" />
                <span>Subclass 190</span>
              </div>
              <div className="text-xs font-normal text-gray-500 mt-1">Skilled Nominated</div>
            </th>
            <th className="p-4 md:p-6 text-sm font-bold text-amber-900 w-1/4 bg-amber-50/40">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Subclass 491</span>
              </div>
              <div className="text-xs font-normal text-gray-500 mt-1">Skilled Work Regional</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Visa Status</td>
            <td className="p-4 md:p-5 bg-brand-50/20 font-bold text-green-700">Permanent Residency (PR)</td>
            <td className="p-4 md:p-5 bg-brand-50/10 font-bold text-green-700">Permanent Residency (PR)</td>
            <td className="p-4 md:p-5 bg-amber-50/10 font-bold text-amber-800">5-Year Provisional (Path to PR via 191)</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Sponsorship Needed</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-gray-700">None (Points independent)</td>
            <td className="p-4 md:p-5 bg-brand-50/10 text-gray-700">State/Territory Government nomination</td>
            <td className="p-4 md:p-5 bg-amber-50/10 text-gray-700">State/Territory OR Eligible Family Member</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Nomination Points Bonus</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-gray-600">0 points</td>
            <td className="p-4 md:p-5 bg-brand-50/10 font-semibold text-brand-800">+5 points added to score</td>
            <td className="p-4 md:p-5 bg-amber-50/10 font-semibold text-amber-700">+15 points added to score</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Occupation List</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-gray-700">MLTSSL only (Medium &amp; Long Term)</td>
            <td className="p-4 md:p-5 bg-brand-50/10 text-gray-700">MLTSSL, STSOL + State Priority Lists</td>
            <td className="p-4 md:p-5 bg-amber-50/10 text-gray-700">MLTSSL, STSOL, ROL + Regional Lists</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Location Freedom</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-gray-700">Anywhere across Australia</td>
            <td className="p-4 md:p-5 bg-brand-50/10 text-gray-700">2-year moral commitment to nominating state</td>
            <td className="p-4 md:p-5 bg-amber-50/10 text-gray-700">Must live and work in designated regional area</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Minimum Baseline Points</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-gray-700">65 points (Competitive: 85-95+)</td>
            <td className="p-4 md:p-5 bg-brand-50/10 text-gray-700">65 points (Incl. 5 state points)</td>
            <td className="p-4 md:p-5 bg-amber-50/10 text-gray-700">65 points (Incl. 15 regional points)</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Medicare Access</td>
            <td className="p-4 md:p-5 bg-brand-50/20 text-green-700 font-medium">Immediate Medicare access</td>
            <td className="p-4 md:p-5 bg-brand-50/10 text-green-700 font-medium">Immediate Medicare access</td>
            <td className="p-4 md:p-5 bg-amber-50/10 text-green-700 font-medium">Immediate Medicare access (under 491)</td>
          </tr>
          <tr>
            <td className="p-4 md:p-5 font-semibold text-gray-900">Learn More</td>
            <td className="p-4 md:p-5 bg-brand-50/20">
              <Link
                href="/migrate-to-australia/skilled-independent-visa-subclass-189"
                className="text-brand-700 hover:text-brand-900 font-semibold underline"
              >
                View 189 Details &rarr;
              </Link>
            </td>
            <td className="p-4 md:p-5 bg-brand-50/10">
              <Link
                href="/migrate-to-australia/skilled-nominated-visa-subclass-190"
                className="text-brand-700 hover:text-brand-900 font-semibold underline"
              >
                View 190 Details &rarr;
              </Link>
            </td>
            <td className="p-4 md:p-5 bg-amber-50/10">
              <Link
                href="/migrate-to-australia/skilled-work-regional-provisional-visa-subclass-491"
                className="text-amber-700 hover:text-amber-900 font-semibold underline"
              >
                View 491 Details &rarr;
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
