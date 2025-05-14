import React from 'react';

interface DatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor="transaction-date">Data</label>
      <input
        id="transaction-date"
        type="date"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DatePicker;
