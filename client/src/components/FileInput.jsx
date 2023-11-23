import propTypes from 'prop-types'

function FileInput({id, multiple, required}) {
    return (
      <div className='w-full'>
        <label
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar">
            Upload file
        </label>
        <input
            className="w-full bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block p-2.5 mb-4"
            aria-describedby={id + '_help'}
            id={id}
            name={id}
            type="file"
            multiple={multiple}
            required={required}
        />
      </div>
  )
}

FileInput.propTypes = {
    id: propTypes.string.isRequired,
    multiple: propTypes.bool.isRequired,
    required: propTypes.bool.isRequired,
}

export default FileInput