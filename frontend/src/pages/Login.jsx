import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(loginSuccess(data.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <>
      {isLoading && <h1 className="font-bold text-center my-6">Loading...</h1>}
      <div className=" container  text-center my-[100px]">
        <h1 className="font-bold uppercase text-slate-500 my-6 max-w-sm mx-auto px-2">
          Login
        </h1>
        <form
          className="flex px-2 flex-col max-w-sm mx-auto gap-5"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            onChange={handleChange}
          />

          <input
            type="submit"
            className="rounded-lg border p-2 focus:outline-none bg-blue-500 uppercase font-bold text-black"
            value="Login"
          />
        </form>

        <p className="font-semibold my-4">
          Do not have account ?{" "}
          <Link to="/register" className="font-bold mx-2">
            {" "}
            Create account
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
