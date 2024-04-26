import React from 'react';

const InputCustom = ({ label, value, type, placeholder, className, onChange } : {label: string, value: string, type:string, placeholder: string, className: string,onChange : (value: string) => void}) => {
  
  const getClassName = () => {
    const base = 'border border-gray-300 rounded p-2 text-black col-12';
    return className ? `${base} ${className}` : base;
  }

  return (
    <div className='container'>
      <label className="col-12">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={getClassName()}
      />
    </div>
  );
};

export default InputCustom;
