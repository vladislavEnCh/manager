import React from 'react';
import { FieldError, FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: any;
}

const FormInput: React.FC<InputProps> = ({ name, label, placeholder, type = 'text', register, rules, error }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1">{label}</label>
      <input
        {...register(name, rules)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
