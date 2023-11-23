import Grid from '@mui/material/Unstable_Grid2';
import InputField from "../components/InputField";
import TextArea from '../components/TextArea';
import CustomSelect from '../components/CustomSelect';
import FileInput from '../components/FileInput';
import { addProduct } from "../apis/productApi";

function Uploadproduct () {
    const handleForm = async (e) => {
        const form = document.getElementById('productForm');
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        await addProduct(formdata);
        form.reset();
    }

    return (
        <div className="w-screen h-auto p-0 m-0 bg-transparent ">
            <h1 className="max-w-[280px] md:max-w-[50%] mx-auto pt-[7vh] text-center text-2xl font-bold">Upload Product</h1>
            <form id='productForm' onSubmit={(e) => handleForm(e)} className="max-w-[280px] md:max-w-[50%] mx-auto flex flex-col items-center pt-5">
                <Grid container spacing={2}>
                        <Grid xs={12}>
                            <FileInput
                                id="photos"
                                multiple={true}
                                required={true}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <InputField
                                id="name"
                                label="Product Name"
                                type="text"
                                placeholder="Enter Product Name"
                                required={true}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <TextArea
                                id="description"
                                label="Description"
                                placeholder="Enter Your Description Here..."
                            required={true}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <InputField
                                id="price"
                                label="Price"
                                type="number"
                                placeholder="Enter Price"
                                required={true}
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
                        />
                        </Grid>
                        <Grid xs={12}>
                            <button type="submit" className="mb-3 bg-blue-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md">
                                Add Product
                            </button>
                        </Grid>
                    </Grid>
            </form>
        </div>
    )
}

export default Uploadproduct