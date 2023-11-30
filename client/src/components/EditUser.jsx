import PropTypes from 'prop-types';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import InputField from "../components/InputField";

function EditUser ({ user, onClose }) {
    const [name, setName] = useState(user !== null && user?.name);
    const [disable, setDisable] = useState(true);

    const handleForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        console.log(formdata)
        onClose();
    };


    const handleCancel = () => {
        const form = document.getElementById('userForm');
        form.reset();
        onClose();
    }

    return (
        <form id='userForm' onSubmit={(e) => handleForm(e)} className="w-full p-3 flex">
            <div className='flex w-[45%] md:mr-5 border border-grey-100 overflow-x-scroll'>
                <h1>Detailed User</h1>
            </div>
            <div className='block w-[55%]'>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <InputField
                            id="name"
                            label="User Name"
                            type="text"
                            placeholder="Enter User Name"
                            required={true}
                            value={name}
                            disabled={disable}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </Grid>
                    <Grid xs={12}>
                        {
                            disable === true ?
                                (
                                    <button className="mb-3 bg-blue-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md" onClick={() => setDisable(false)}>
                                        Edit
                                    </button>
                                )
                                : (
                                    <>
                                        <button type="submit" className="ml-3 mb-3 bg-blue-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md">
                                            Save
                                        </button>

                                        <button className="mb-3 bg-red-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md" onClick={() => handleCancel()}>
                                            Cancel
                                        </button>
                                    </>
                                )
                        }
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}

EditUser.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func
};

export default EditUser;