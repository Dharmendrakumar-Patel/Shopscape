import PropTypes from 'prop-types';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import InputField from "../components/InputField";
import TextArea from '../components/TextArea';
import CustomSelect from '../components/CustomSelect';
import { updateProduct, getAllProduct } from "../apis/productApi";

function EditProduct ({ product, onClose }) {
    const [name, setName] = useState(product !== null && product?.name);
    const [description, setDescription] = useState(product !== null && product?.description);
    const [price, setPrice] = useState(product !== null && product?.price);
    const [status, setStatus] = useState(product !== null && product?.status);
    const [disable, setDisable] = useState(true);

    const handleForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        await updateProduct(product._id, formdata);
        await getAllProduct()
        onClose()
    }

    const handleCancel = () => {
        const form = document.getElementById('productForm');
        form.reset()
        onClose()
    }
  return (
      <form id='productForm' onSubmit={(e) => handleForm(e)} className="w-full p-3 flex">
            <div className='flex w-[45%] md:mr-5 border border-grey-100 overflow-x-scroll'>
              {
                    product !== null && product?.photos?.map((photo, index) => {
                        return <img key={index} src={photo.url} alt={product.name} className='w-[100%] max-h-[350px] object-cover p-2' />;
                    })
              }
            </div>
            <div className='block w-[55%]'>              
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <InputField
                            id="name"
                            label="Product Name"
                            type="text"
                            placeholder="Enter Product Name"
                            required={true}
                            value={name}
                            disabled={disable}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextArea
                            id="description"
                            label="Description"
                            placeholder="Enter Your Description Here..."
                            required={true}
                            value={description}
                            disabled={disable}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <InputField
                            id="price"
                            label="Price"
                            type="number"
                            placeholder="Enter Price"
                            required={true}
                            value={price}
                            disabled={disable}
                            onChange={(e) => setPrice(e.currentTarget.value)}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <CustomSelect
                            id='status'
                            label='Status'
                            options={[
                                { value: 'available', label: 'Available' },
                                { value: 'unavailable', label: 'Unavailable' },
                            ]}
                            required={true}
                            value={status}
                            disabled={disable}
                            onChange={(e) => setStatus(e.currentTarget.value)}
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
                            :(
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
  )
}

EditProduct.propTypes = {
    product: PropTypes.object,
    onClose: PropTypes.func
}

export default EditProduct