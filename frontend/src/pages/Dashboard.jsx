import { useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersPostsFailure,
  getUsersPostsSuccess,
  getUsersPostsStart,
} from "../redux/features/postSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { usersPosts, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchUsersPost = async () => {
      dispatch(getUsersPostsStart());
      try {
        const res = await fetch(`api/post/users/posts`, {
          method: "GET",
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(getUsersPostsFailure(data.message));
          return;
        }
        dispatch(getUsersPostsSuccess(data.data));
      } catch (err) {
        dispatch(getUsersPostsFailure(err.message));
      }
    };

    fetchUsersPost();
  }, []);
  return (
    <>
      {isLoading && <div className="text-center my-5">Loading...</div>}

      <div className="max-w-lg p-5 mx-auto md:max-w-3xl">
        <Link
          to="/post"
          className="font-semibold text-white px-4 py-2 border rounded-lg bg-slate-500"
        >
          New Post
        </Link>
        <h1 className="text-center my-4 font-bold text-lg">Dashboard</h1>
        {/* Card */}

        <div className="flex gap-4 flex-col">
          {usersPosts.map((post) => (
            <DashboardCard key={post._id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
