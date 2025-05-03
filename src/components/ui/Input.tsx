import React, { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative rounded-md">
        <input
          id={id}
          className={`
            w-full px-4 py-2.5 rounded-lg border text-black ${
              error ? "border-red-500" : "border-gray-300"
            }
            focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-200" : "focus:ring-blue-100"
            } 
            focus:border-transparent transition duration-150 ease-in-out
            ${icon ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fadeIn" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
