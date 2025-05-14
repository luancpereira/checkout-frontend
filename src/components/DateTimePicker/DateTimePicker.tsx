import React from 'react';
import '../InputField/InputField.css';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange, required = false }) => {
  return (
    <div className="input-field">
      <div className="div-label"> 
      <label>
        {label}
      </label>
      </div>
      <div className="div-input"> 
      <input
          type="datetime-local"
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
