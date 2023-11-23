import { signUp } from "../apis/userApi";
import { addUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import InputField from "../components/InputField";
import FileInput from "../components/FileInput";
import { NavLink, useNavigate } from "react-router-dom";

function Signup () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSignUp = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const user = await signUp(formdata);

    //check if user.data is not undefined
    if (user !== "undefined") {
      dispatch(addUser(user));
    }

    //check if local storage has webBrain token
    if (localStorage.getItem("webBrain")) {
      navigate("/");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#E5E7EB]">
      <form onSubmit={handleFormSignUp} className="max-w-[280px] mx-auto flex flex-col items-center pt-[10vh]">
        <InputField
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter Full Name"
          required={true}
        />
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
        <FileInput
          id="photo"
          multiple={false}
          required={true}
        />
        <button type="submit" className="mb-3 bg-blue-500 text-white font-medium w-full p-2 rounded-md">
          Sign Up
        </button>
        <p>
          <span className="mr-2">User already have account?</span>
          <NavLink to="/signin" >
            <span className="text-blue-500 font-medium"> Sign In</span>
          </NavLink>
        </p>
      </form>
    </div>
  )
}

export default Signup