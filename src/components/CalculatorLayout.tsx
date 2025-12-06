import type React from 'react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const CalculatorLayout = ({ title, description, children }: CalculatorLayoutProps) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <header className="mb-4 flex flex-col gap-1">
      <div className="text-xs uppercase tracking-wide text-emerald-600">AdóIránytű</div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </header>
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">{children}</div>
    <p className="mt-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
      Ez egy tájékoztató eszköz, nem minősül adótanácsadásnak.
    </p>
  </section>
);

export default CalculatorLayout;
