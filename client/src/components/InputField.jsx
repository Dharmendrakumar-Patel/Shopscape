import PropTypes from 'prop-types';

function InputField ({ id, label, type, value, disabled,  placeholder, required, onChange }) {
  return (
    <div className='w-full'>
        <label
            htmlFor={id}
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <input
            type={type}
            name={id}
            id={id}
            autoComplete={id}
            value={value}
            className="w-full bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block p-2.5 mb-4"
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onChange={onChange}
        />
    </div>
  )
}

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}

export default InputField