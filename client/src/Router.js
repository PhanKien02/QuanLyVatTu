import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/authRouter/auth";
const Home = lazy(() => import("./layouts/home/home"));
const Auth = lazy(() => import("./layouts/auth/auth"));
const Login = lazy(() => import("./pages/auth/login-form/login-form"));
const Register = lazy(() => import("./pages/auth/register-form/register-form"));
const VatuComponent = lazy(() => import("./pages/main/vatTuPage/index/vatTuComponent"));
const NhanVienComponen = lazy(() => import("./pages/main/NhanVienPage/indexs/nhanvienComponent"));
const Profile = lazy(() => import("./pages/profileNhanVien/index/profile"));

const WebRoute = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <RequireAuth>
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route path="vattu" element={<VatuComponent />} />
                            <Route
                                path="nhan-vien"
                                element={<NhanVienComponen />}
                            />
                        </Route>
                        <Route path="/user/:id" element={<Profile />} />
                    </Routes>
                </RequireAuth>
                <Routes>
                    <Route path="/auth" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};
export default WebRoute;
