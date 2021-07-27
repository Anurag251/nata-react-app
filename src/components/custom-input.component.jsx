import React from 'react';

const CustomInput = ({
  label,
  type,
  value,
  handleChange,
  border,
  ...otherInputProps
}) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        className={`${border ? 'border' : ''}`}
        type={type}
        value={value}
        onChange={handleChange}
        {...otherInputProps}
      />
    </div>
  );
};

export default CustomInput;
