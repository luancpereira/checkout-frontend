import React from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'danger' | 'success' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={`custom-button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
