import React from 'react';
import './InputField.css';

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required = false, step }) => {
  return (
    <div className="input-field">
      <div className="div-label"> 
      <label>
        {label}
      </label>
      </div>
      <div className="div-input">
       <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          step={step}
        />
      </div>
    </div>
  );
};

export default InputField;
