import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function FileUpload ({ onDrop, maxSize }) {
    return (
      <>
        <Dropzone
            onDrop={onDrop}
            multiple={true}
            maxSize={maxSize}
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    className='w-[300px] h-[240px] border border-gray-100 flex justify-center items-center cursor-pointer bg-[#8d8e8f63]'
                    {...getRootProps()}
                >
                    <input
                        {...getInputProps()}
                    />
                    <AddOutlinedIcon className='text-white' />
                </div>
            )}
        </Dropzone>
      </>
  )
}

FileUpload.propTypes = {
    onDrop: PropTypes.func.isRequired,
    maxSize: PropTypes.number.isRequired,
};

export default FileUpload