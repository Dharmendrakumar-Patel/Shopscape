import { useEffect } from "react"
import { addUser } from "../redux/user/userSlice"
import { addProduct } from "../redux/product/productSlice"
import { useDispatch } from "react-redux"
import { getUser } from "../apis/userApi"
import { getAllProduct } from "../apis/productApi"
import NavBar from "../components/NavBar"
import { Outlet } from "react-router-dom";

function Home () {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("webBrain")) {
      (async () => {
        const user = await getUser()
        const products = await getAllProduct()
        dispatch(addProduct(products))
        dispatch(addUser(user))
      })()
    }
  }, [dispatch])


  return (
    <div className="bg-[#E5E7EB] w-screen h-screen">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Home
