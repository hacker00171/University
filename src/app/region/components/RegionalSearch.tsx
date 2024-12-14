'use client';

import { type FC, useState } from 'react';

interface RegionalSearchProps {
  onSearch?: (query: string) => void;
}

export const RegionalSearch: FC<RegionalSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch?.(newQuery);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            placeholder="Search regions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <select className="block w-full sm:w-auto px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Regions</option>
          <option value="north">North Region</option>
          <option value="south">South Region</option>
          <option value="east">East Region</option>
          <option value="west">West Region</option>
        </select>
        <select className="block w-full sm:w-auto px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Status</option>
          <option value="increasing">Increasing</option>
          <option value="stable">Stable</option>
          <option value="decreasing">Decreasing</option>
        </select>
      </div>
    </div>
  );
}
