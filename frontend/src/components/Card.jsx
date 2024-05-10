import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import formatDistaceToNow from "date-fns/formatDistanceToNow";

const Card = (props) => {
  return (
    <>
      <div className="card max-w-xl mx-auto border border-slate-500 p-4 flex flex-col gap-3 my-4 rounded-lg">
        <div className="font-semibold flex flex-col">
          <h4 className="text-slate-500 uppercase">{props.title}</h4>
          <p className="text-slate-600 max-h-[200px] overflow-hidden line-clamp-4">
            {props.description}
          </p>
          <div className=" flex mt-6 items-center justify-between">
            <span className=" text-slate-400 ">
              {formatDistaceToNow(new Date(props.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <Link
            to={`comment/${props._id}`}
            className=" cursor:pointer uppercase text-slate-400 font-semibold "
          >
            comments
          </Link>
          <span className="font-semibold text-slate-400">
            by {props.user?.name}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
