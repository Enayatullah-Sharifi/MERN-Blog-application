import { FaPaperPlane } from "react-icons/fa";
import CommentCard from "../components/CommentCard";
import { useState, useParams } from "react";

export const Comment = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postId);
    // const res = await fetch("api/comment");
  };

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
        {/* card */}
        <CommentCard />
      </div>
    </div>
  );
};
