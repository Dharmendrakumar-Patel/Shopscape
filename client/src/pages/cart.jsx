
import { useSelector, useDispatch } from 'react-redux'
import { removeProductFromCart } from '../apis/userApi'
import { addUser } from '../redux/user/userSlice'

function Cart () {
    const cart = useSelector(state => state?.user?.value?.cart)
    const products = useSelector(state => state?.product?.value)
    const dispatch = useDispatch()

    const handleDelete = async (id) => {
        const cartForm = new FormData();
        cartForm.append('productId', id);
        const user = await removeProductFromCart(cartForm);
        dispatch(addUser(user));
    }

  return (
        <div className="w-screen h-auto p-0 m-0 bg-transparent">
            <h1 className="max-w-[280px] sm:max-w-[90%] mx-auto pt-[7vh] text-left text-2xl font-bold">Product Cart</h1>
            <div className='max-w-[280px] sm:max-w-[90%] mx-auto mt-7'>
                {
                  cart !== null && cart?.map((product, index) => {
                        const productDetail = products.find((item) => item._id === product.productId)
                        return (    
                            <div key={index} className="w-full flex justify-between items-center border rounded-lg p-2 mb-4">
                                <div className="image w-[50px] h-[100px] mx-2">
                                    <img className="object-cover h-full w-auto" src={productDetail.photos[0].url} alt={productDetail.name} />
                                </div>
                                <div className='mx-2'>
                                    <h1 className="text-sm font-bold">
                                        <p>Name: {productDetail.name}</p>
                                        <p>Price: {productDetail.price}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </h1>
                                </div>
                                <div className='mx-2'>
                                    <h1 className="text-sm font-bold">
                                        Total: Rupees {product.quantity * productDetail.price}
                                    </h1>
                                </div>
                                <div>
                                    <button className='text-sm font-bold bg-blue-500 text-white px-3 py-1 rounded-md  cursor-pointer' onClick={() => handleDelete(product.productId)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
          </div>
          {
                cart !== null && cart.length > 0 && (      
                    <div className='flex items-center justify-between absolute bottom-5 right-5'>
                        <button type="submit" disabled={true} className="mb-3 bg-blue-500 text-white font-medium w-full md:w-[150px] md:float-right p-2 rounded-md cursor-not-allowed">
                            Pay Now
                        </button>
                    </div>
                )
          }
        </div>
  )
}

export default Cart;