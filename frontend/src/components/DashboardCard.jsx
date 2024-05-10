import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import {
  deleteUsersPostsStart,
  deleteUsersPostsSuccess,
  deleteUsersPostsFailure,
} from "../redux/features/postSlice";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteUsersPostsStart());
    try {
      const res = await fetch(`api/post/delete/${props._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUsersPostsFailure(data.message));
        return;
      }

      dispatch(deleteUsersPostsSuccess(data.data));
    } catch (err) {
      dispatch(deleteUsersPostsFailure(err.message));
    }
  };

  return (
    <div className="flex gap-3 flex-col p-4 border-2 rounded-lg sm:flex-row sm:gap-6 sm:justify-between ">
      <div>
        <h3 className="font-bold ">{props.title}</h3>
        <p className="text-slate-600 line-clamp-3 font-semibold">
          {props.description}
        </p>
      </div>

      <div className="flex flex-row sm:flex-col ">
        <button
          onClick={handleDelete}
          className="border border-red-500 rounded-lg font-semibold text-red-500 px-6 py-1 mr-5 sm:mr-2 sm:my-2 hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>

        <Link to={`../${props._id}`}>
          <button className="border border-green-500 rounded-lg font-semibold  hover:bg-green-500 hover:text-white text-green-500 px-6 py-1 mr-5 sm:mr-2">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
