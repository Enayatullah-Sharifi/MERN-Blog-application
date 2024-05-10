import {
  getPostStart,
  getPostSuccess,
  getPostFailure,
} from "../redux/features/postSlice";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPost = async () => {
      dispatch(getPostStart());
      try {
        const res = await fetch("api/post/posts", {
          method: "GET",
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(getPostFailure(data.message));
          return;
        }
        dispatch(getPostSuccess(data.data));
        setPosts(data.data);
      } catch (err) {
        dispatch(getPostFailure(err.message));
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="p-2">
      {/* Post Card */}
      {posts && posts.length > 0 ? (
        posts.map((post) => <Card key={post._id} {...post} />)
      ) : (
        <h1>No Post Exist</h1>
      )}
    </div>
  );
};

export default Home;
