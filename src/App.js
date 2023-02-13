import "./App.css";
import axios from "axios";
import Upload from "./components/UploadVideo";
import Videos from "./pages/Videos";
import { Routes, Route, useNavigate } from "react-router-dom";
import UploadTube from "./pages/UploadTube";
import Reviews from "./components/Reviews";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./store/authSlice";
import Layout1 from "./layouts/Layout1";
import Profile from "./pages/Profile";

axios.defaults.baseURL = "http://localhost:7000/";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/auth", { withCredentials: true });
                dispatch(setAuthUser(res.data));
                // navigate("/");
            } catch (err) {
                navigate("/signup");
            }
        })();
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>

            <Route path="/" element={<Layout1 />}>
                <Route index element={<UploadTube />}></Route>
                <Route path="/videos" element={<Videos />}>
                    <Route path="/videos/reviews" element={<Reviews />}></Route>
                </Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/*" element={<h4>No Page Found</h4>}></Route>
            </Route>

            <Route path="*" element={<h2>No Page Found</h2>}></Route>
        </Routes>
    );
}

export default App;
