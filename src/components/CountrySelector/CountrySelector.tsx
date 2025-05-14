import React from 'react';

interface CountrySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor="country">País</label>
      <select id="country" value={value} onChange={onChange}>
        <option value="brazil">Brasil</option>
        <option value="argentina">Argentina</option>
      </select>
    </div>
  );
};

export default CountrySelector;
