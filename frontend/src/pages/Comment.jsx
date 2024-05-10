import { FaPaperPlane } from "react-icons/fa";
import CommentCard from "../components/CommentCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  getCommentStart,
  getCommentSuccess,
  getCommentFailure,
} from "../redux/features/commentSlice";
import { useDispatch, useSelector } from "react-redux";

const Comment = () => {
  const { comments } = useSelector((state) => state.comment);
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCommentStart());

    try {
      const res = await fetch(`/api/comment/create/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(createCommentFailure(data.message));
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      dispatch(createCommentSuccess(data.data));
      setComment("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(getCommentStart());
      try {
        const res = await fetch(`/api/comment/comments/${postId}`);
        const data = await res.json();

        if (data.success === false) {
          dispatch(getCommentFailure(data.message));
          toast.error(data.message);
          return;
        }

   
        dispatch(getCommentSuccess(data));
      } catch (err) {
        dispatch(getCommentFailure(err.message));
        toast.error(err.message);
      }
    };

    fetchComments();
  }, []);
  return (
    <div className="mt-5">
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg border mx-auto p-2 flex justify-between"
      >
        <input
          type="text"
          name="comment"
          className="w-[80%] focus:outline-none text-lg"
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className=" text-slate-500 text-xl">
          <FaPaperPlane />
        </button>
      </form>

      {/* card container */}
      <div className="border max-w-lg mx-auto p-2 my-3 ">
        <div className=" cursor:pointer text-slate-400 font-semibold ">
          comments
          <span className=" text-center mx-2 text-[.8rem]  bg-green-500 text-white p-[.2rem] rounded-full">
            {comments && comments.length}
          </span>
        </div>

        {/* card */}
        {comments.length > 0 &&
          comments.map((c) => <CommentCard key={c._id} {...c} />)}
      </div>
    </div>
  );
};

export default Comment;
