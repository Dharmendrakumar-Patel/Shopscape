import { signIn } from "../apis/userApi";
import { addUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { NavLink, useNavigate } from "react-router-dom";

function SignIn () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const user = await signIn(formdata);

    //check if user.data is not undefined
    if (user !== "undefined") {
      dispatch(addUser(user));
    }

    //check if local storage has Shopscape token
    if (localStorage.getItem("Shopscape")) { 
      navigate("/")
    }
  }
  
  return (
    <div className="w-screen h-screen bg-[#E5E7EB]">
      <form encType="multipart/form-data" onSubmit={handleForm} className="max-w-[280px] mx-auto flex flex-col items-center pt-[10vh]">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          required={true}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          required={true}
        />
        <button type="submit" className="mb-3 bg-blue-500 text-white font-medium w-full p-2 rounded-md">
          Sign In
        </button>
        <p>
          <span className="mr-2">User does not have account?</span>
          <NavLink to="/signup">
            <span className="text-blue-500 font-medium"> Sign Up</span>
          </NavLink>
        </p>
      </form>
    </div>
  )
}

export default SignIn;