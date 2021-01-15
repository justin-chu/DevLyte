import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="mt-4">
      <label
        htmlFor={field.name}
        className="block text-xs font-medium leading-relaxed tracking-tighter text-gray-700"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          {...field}
          id={field.name}
          placeholder={props.placeholder}
          className="w-full px-4 py-2 mb-4 mr-4 text-base bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          className="w-full px-4 py-2 mt-2 text-base bg-gray-100 border-transparent rounded-lg ext-blue-700 focus:border-gray-500"
          required
        />
      )}
      <h1 className="text-red-500 text-xs mt-2">{error}</h1>
    </div>
  );
};
