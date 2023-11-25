import { useSelector } from 'react-redux';
import CustomCard from '../components/CustomCard';
import Grid from '@mui/material/Unstable_Grid2';

function Product () {
    const products = useSelector((state) => state.product.value);

  return (
        <div className="w-screen h-auto p-0 m-0 bg-transparent">
            <h1 className="max-w-[280px] sm:max-w-[90%] mx-auto pt-[7vh] text-left text-2xl font-bold">Product List</h1>
            <div className='max-w-[280px] sm:max-w-[90%] mx-auto mt-7'>              
                <Grid container spacing={3}>
                    {
                        products !== null && products.map((product, index) => (
                            <Grid xs={12} md={6} lg={4} xl={3} key={index}>      
                                <CustomCard  product={product} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
  )
}

export default Product