import { FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    dispatch(logoutStart());
    try {
      const res = await fetch("api/user/logout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(logoutFailure(data.message));
        return;
      }
      dispatch(logoutSuccess(data.data));
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailure(err.message));
    }
  };
  return (
    <>
      <div className="max-w-xl flex flex-col items-center justify-center mx-auto mt-12 p-5">
        

        <br className="text-slate-500" />
        {/* logout and profile */}
        <div className="border-t-2 w-full flex items-center justify-center p-3 font-bold flex-wrap gap-5 sm:justify-between">
          <Link
            to={`/profile/${userInfo._id}`}
            className="flex items-center gap-2 hover:text-red-500"
          >
            <MdAccountCircle className="text-3xl" /> Profile
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-red-500"
          >
            <FaChartBar />
            Dashboard
          </Link>
          <Link
            onClick={handleSignout}
            className="flex items-center gap-2 hover:text-red-500"
          >
            <FaSignOutAlt />
            Signout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
