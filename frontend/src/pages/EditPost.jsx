import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usersPosts } = useSelector((state) => state.post);
  const post = usersPosts.find((post) => post._id === id);
  const [formData, setFormData] = useState(post);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(editPostStart());
    try {
      const res = await fetch(`api/post/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        // dispatch(editPostFailure(data.message));
        toast.error(data.message);
        return;
      }
      // dispatch(editPostSuccess(data.data));
      toast.success(data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);

      // dispatch(editPostFailure());
    }
  };

  return (
    <div className="p-2">
      {/* {isLoading && <div className="text-center my-6">Loading...</div>} */}
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
          defaultValue={formData?.title}
        />
        <textarea
          cols="30"
          rows="10"
          className="border w-full border-slate-500 rounded-lg p-2 font-semibold focus:outline-none"
          placeholder="Your post here..."
          onChange={handleChange}
          name="description"
          defaultValue={formData?.description}
        />
        <button
          // disabled={isLoading}
          className="w-full bg-slate-500 p-2 rounded-lg uppercase font-bold"
        >
          update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
