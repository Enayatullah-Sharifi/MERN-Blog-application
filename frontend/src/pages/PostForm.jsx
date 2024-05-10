import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postStart,
  postSuccess,
  postFailure,
} from "../redux/features/postSlice";

const PostForm = () => {
  const { error, isLoading } = useSelector((state) => state.post);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postStart());
    try {
      const res = await fetch("api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(postFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(postSuccess(data.data));
      toast.success(data.message);
      navigate("/dashboard");
    } catch (err) {
      dispatch(postFailure());
    }
  };
  return (
    <div className="p-2">
      {isLoading && <div className="text-center my-6">Loading...</div>}
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto my-5 flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title..."
          className="border border-slate-500 w-full p-2 rounded-lg font-bold focus:outline-none"
          onChange={handleChange}
          name="title"
        />
        <textarea
          cols="30"
          rows="10"
          className="border w-full border-slate-500 rounded-lg p-2 font-semibold focus:outline-none"
          placeholder="Your post here..."
          onChange={handleChange}
          name="description"
        />
        <button
          disabled={isLoading}
          className="w-full bg-slate-500 p-2 rounded-lg uppercase font-bold"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
