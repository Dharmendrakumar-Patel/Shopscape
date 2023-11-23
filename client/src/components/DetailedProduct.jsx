import { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { addProductToCart } from '../apis/userApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function DetailedProduct ({ product, onClose }) {
    const [cart, setCart] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddToCart = async () => {
        const cartForm = new FormData()
        cartForm.append('productId', product._id)
        cartForm.append('quantity', cart)
        const user = await addProductToCart(cartForm)
        setCart(0)
        dispatch(addUser(user))
        navigate('/cart')
        onClose()
    }

  return (
        <div className='block md:flex'>
            <div className='flex w-[45%] md:mr-5 border border-grey-100 overflow-x-scroll'>
              {
                    product && product.photos.map((photo, index) => {
                        return <img key={index} src={photo.url} alt={product.name} className='w-[100%] max-h-[350px] object-cover p-2' />
                    })
              }
            </div>
            <div className='block w-[55%]'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <h3 className='text-xl font-semibold'>Name: </h3>
                        <p>{product && product.name}</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3 className='text-xl font-semibold'>Description: </h3>
                        <p>{product && product.description}</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3 className='text-xl font-semibold mt-3'>Price: </h3>
                        <p>{product && product.price}</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3 className='text-xl font-semibold mt-3'>In Stock: </h3>
                        <p>{product && product.status}</p>
                    </Grid>
                </Grid> 
                <h3 className='text-xl font-semibold mt-5'>Add to Cart: </h3>
                <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-3 w-[120px] justify-center items-center">
                    <button className=" bg-gray-300 text-gray-600 hover:bg-gray-400 w-20 rounded-l cursor-pointer outline-none h-full" onClick={() => cart == 0 ? setCart(0) : setCart(cart - 1)}>
                        <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <p className="bg-gray-300 text-gray-600 w-20 text-center h-full pt-2">{cart}</p>
                    <button className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-20 rounded-r cursor-pointer outline-none h-full" onClick={() => setCart(cart + 1)}>
                        <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                </div>
              <button type="submit" onClick={() => handleAddToCart()} className="mb-3 bg-blue-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md absolute bottom-3 right-[35px] ">
                    Add to Cart
                </button>
            </div>
        </div>
  )
}

DetailedProduct.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default DetailedProduct