import PropTypes from 'prop-types';

function CustomSelect ({ id, label, value, disabled, options, required, onChange }) {
    return (
        <div className='w-full'>
            <label
                htmlFor={id}
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                id={id}
                name={id}
                value={value}
                className="w-full bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block p-2.5 mb-4"
                required={required}
                disabled={disabled}
                onChange={onChange}
            >
                <option selected>Choose a {label}</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
  )
}

CustomSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    required: PropTypes.bool.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}

export default CustomSelect