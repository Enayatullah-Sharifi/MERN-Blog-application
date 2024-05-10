import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerStart());

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(registerFailure(data.message));
        toast.error(data.message);
        return;
      } else {
        navigate("/");
        dispatch(registerSuccess(data.data));
      }
    } catch (err) {
      toast.error(err.message);
      dispatch(registerFailure(err.message));
    }
  };

  return (
    <>
      <div className=" container  text-center my-[100px]">
        <h1 className="font-bold uppercase text-slate-500 my-6 max-w-sm mx-auto px-2">
          Please Register now
        </h1>
        <form
          onSubmit={handleRegisterSubmit}
          className="flex px-2 flex-col max-w-sm mx-auto gap-5"
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            placeholder="Name"
            onChange={handleChange}
          />
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
            type="password"
            name="password2"
            placeholder="Confirm password"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            onChange={handleChange}
          />
          <button
            disabled={isLoading}
            className="rounded-lg border p-2 focus:outline-none bg-blue-500 uppercase font-bold text-black"
          >
            {isLoading ? <h3>Loading...</h3> : <h3>register</h3>}
          </button>
        </form>

        <p className="font-semibold my-4">
          Already have an account ?{" "}
          <Link to="/login" className="font-bold mx-2">
            {" "}
            login
          </Link>
        </p>

        
      </div>
    </>
  );
};

export default Register;
