import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Comment from "./pages/Comment";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<PostForm />} />
          <Route path="/:id" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comment/:postId" element={<Comment />} />
          <Route path="/profile/:userId" element={<UserDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
