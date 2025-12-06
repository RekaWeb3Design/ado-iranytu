import { useMemo, useState } from 'react';
import KivaCalculator from './calculators/kiva/KivaCalculator';
import { useTaxConfigStore } from './state/taxConfigStore';

const calculators = [
  { id: 'kiva', title: 'KIVA kalkulátor', description: 'Kisvállalati adó kalkulátor', component: <KivaCalculator /> },
  { id: 'tao', title: 'TAO kalkulátor', description: 'Társasági adó (hamarosan)', component: <Placeholder name="TAO" /> },
  { id: 'atalanyado', title: 'Átalányadó kalkulátor', description: 'Hamarosan elérhető', component: <Placeholder name="Átalányadó" /> },
  { id: 'ev', title: 'Egyéni vállalkozói SZJA', description: 'Hamarosan elérhető', component: <Placeholder name="EV SZJA" /> },
  { id: 'kata', title: 'Új KATA megfelelés', description: 'Hamarosan elérhető', component: <Placeholder name="KATA" /> },
  { id: 'berkoltseg', title: 'Bérköltség kalkulátor', description: 'Hamarosan elérhető', component: <Placeholder name="Bérköltség" /> },
  { id: 'ingatlan', title: 'Ingatlanértékesítés SZJA', description: 'Hamarosan elérhető', component: <Placeholder name="Ingatlan" /> },
  { id: 'gepjarmu', title: 'Gépjárműadó', description: 'Hamarosan elérhető', component: <Placeholder name="Gépjárműadó" /> },
];

const App = () => {
  const [activeId, setActiveId] = useState('kiva');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { currentYear, configVersion } = useTaxConfigStore();

  const ActiveComponent = useMemo(() => calculators.find((c) => c.id === activeId)?.component, [activeId]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(next);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900 transition dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3 rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur dark:bg-gray-900/80 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-emerald-600">AdóIránytű</p>
            <h1 className="text-3xl font-bold">Adózási döntéstámogató eszköztár</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Aktuális év: {currentYear} · Paraméter verzió: {configVersion}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm dark:bg-gray-100 dark:text-gray-900"
            >
              {theme === 'light' ? 'Sötét mód' : 'Világos mód'}
            </button>
          </div>
        </header>

        <nav className="grid gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-gray-900/80 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveId(calc.id)}
              className={`rounded-xl border px-4 py-3 text-left shadow-sm transition ${
                activeId === calc.id
                  ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/30'
                  : 'border-gray-200 bg-white hover:border-emerald-200 dark:border-gray-800 dark:bg-gray-800'
              }`}
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{calc.title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{calc.description}</div>
            </button>
          ))}
        </nav>

        <main className="pb-10">{ActiveComponent}</main>
      </div>
    </div>
  );
};

const Placeholder = ({ name }: { name: string }) => (
  <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{name} modul</h2>
    <p className="mt-2 text-sm">A kalkulátor fejlesztés alatt áll. Válaszd ki a már elérhető modulokat a menüből.</p>
    <p className="mt-3 text-xs uppercase tracking-wide text-emerald-600">Hamarosan</p>
  </section>
);

export default App;
