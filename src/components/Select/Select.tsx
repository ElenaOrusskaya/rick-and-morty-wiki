import type { ChangeEvent } from 'react';
import styles from './Select.module.scss';

interface SelectProps {
    total: number;
    name: string;
    value: number;
    onChange: (id: number) => void;
}

export function Select ({total, name, value, onChange}: SelectProps) {
return (
    <div className={styles.selectContainer}>
    <select 
    className={styles.select}
    value={value}
    onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(Number(e.target.value))}
    >
        {Array.from({ length: total }, (_, i) => i + 1).map((number) => (
        <option key={number} value={number}>
          {name} - {number}
        </option>
      ))}
    </select>
    </div>
)
}