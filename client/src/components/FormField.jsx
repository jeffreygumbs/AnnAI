import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-neutral-700'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-medium text-xs bg-neutral-100 py-1.5 px-3 rounded-full text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition'
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-white border border-black/10 text-neutral-900 text-sm rounded-xl focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/15 placeholder-neutral-400 outline-none block w-full p-3 transition'
      />
    </div>
  );
};

export default FormField;
