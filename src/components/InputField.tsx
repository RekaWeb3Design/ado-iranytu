import type React from 'react';
import InfoTooltip from './InfoTooltip';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helpText: string;
  tooltip: string;
}

const InputField = ({ label, helpText, tooltip, ...props }: InputFieldProps) => (
  <label className="flex flex-col gap-1 text-sm">
    <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
      <span className="font-medium">{label}</span>
      <InfoTooltip content={tooltip} />
    </div>
    <input
      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-gray-700 dark:bg-gray-800"
      {...props}
    />
    <span className="text-xs text-gray-500 dark:text-gray-400">{helpText}</span>
  </label>
);

export default InputField;
