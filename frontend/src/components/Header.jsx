import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [file, setFile] = useState();

  useEffect(() => {
    setFile(userInfo?.avatar);
  }, [userInfo]);

  return (
    <>
      <div className="bg-slate-500">
        <div className=" max-w-6xl flex items-center justify-between p-3 mx-auto">
          <div className="logo font-bold text">
            <Link to="/">
              <h1>BlogAPP</h1>
            </Link>
          </div>

          <div className="links gap-3 items-center font-bold">
            {userInfo ? (
              <div className="flex gap-8">
                <Link to="/profile">
                  <img
                    alt={userInfo.name}
                    src={`http://localhost:5000/uploads/${file}`}
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <Link to="register" className="flex gap-3 items-center">
                <FaBookOpen /> Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
