import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isLoading, userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(userInfo ? userInfo : null);

  const { name, avatar, newPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    const sendToData = new FormData();
    sendToData.append("name", name);
    sendToData.append("avatar", avatar);
    sendToData.append("newPassword", newPassword ? newPassword : "");

    const res = await fetch("../api/user/update", {
      method: "PUT",
      body: sendToData,
    });
    const data = await res.json();
  

    if (data.success === false) {
      toast.error(data.message);
      dispatch(updateUserFailure(data.message));
     
    }

    dispatch(updateUserSuccess(data.data));
    navigate("/");
  };

  return (
    <>
      <div className=" container  text-center my-[50px]">
        <form
          onSubmit={handleUpdateUser}
          className="flex px-2 flex-col max-w-lg mx-auto gap-5"
          autoComplete="off"
        >
          <input type="file" onChange={handleImageChange} />
          <input
            type="text"
            name="name"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            placeholder="Name"
            onChange={handleChange}
            value={name}
          />
          <input
            type="password"
            name="newPassword"
            className="rounded-lg border p-2 focus:outline-none font-semibold"
            placeholder="New Password"
            onChange={handleChange}
            value={newPassword}
          />

          <button
            disabled={isLoading}
            className="rounded-lg border p-2 focus:outline-none bg-blue-500 uppercase font-bold text-black"
          >
            {isLoading ? <h3>Loading...</h3> : <h3>Update</h3>}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDetails;
