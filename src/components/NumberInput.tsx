import InputField from './InputField';
import { parseNumber } from '../utils/formatters';

interface NumberInputProps {
  label: string;
  helpText: string;
  tooltip: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

const NumberInput = ({ label, helpText, tooltip, value, onChange, min = 0 }: NumberInputProps) => (
  <InputField
    label={label}
    helpText={helpText}
    tooltip={tooltip}
    type="number"
    inputMode="decimal"
    min={min}
    value={value}
    onChange={(e) => onChange(parseNumber(e.target.value))}
  />
);

export default NumberInput;
