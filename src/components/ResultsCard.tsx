import type React from 'react';

interface ResultsCardProps {
  title: string;
  children: React.ReactNode;
}

const ResultsCard = ({ title, children }: ResultsCardProps) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">{children}</div>
  </div>
);

export default ResultsCard;
