import avatar from "../assets/images/avatar.svg";
const CommentCard = (props) => {
  return (
    <>
      <div className="card border border-slate-500 p-2 rounded-lg overflow-hidden flex justify-between items-center my-3">
        <div className="text max-w-[80%]">
          <p className="line-clamp-3">{props.comment}</p>
        </div>
        <div>
          <img
            src={`http://localhost:5000/uploads/${props.user.avatar}`}
            alt=""
            className="rounded-full w-12 h-12"
          />
        </div>
      </div>
    </>
  );
};

export default CommentCard;
