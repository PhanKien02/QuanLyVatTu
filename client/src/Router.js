import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/authRouter/auth";
const Home = lazy(() => import("./layouts/home/home"));
const Auth = lazy(() => import("./layouts/auth/auth"));
const Login = lazy(() => import("./pages/auth/login-form/login-form"));
const Register = lazy(() => import("./pages/auth/register-form/register-form"));
const VatuComponent = lazy(() => import("./pages/main/vatTuPage/index/vatTuComponent"));
const NhanVienComponen = lazy(() => import("./pages/main/NhanVienPage/indexs/nhanvienComponent"));
const Profile = lazy(() => import("./layouts/profileNhanVien/profile"));
const Loading = lazy(() => import("./components/loading/loading"));
const ThongTinCaNhan = lazy(()=>import("./pages/profileNhanVien/thongTinCaNhan/thongTinCaNhan"))
const WebRoute = () => {
    return (
        <Router>
            <Suspense fallback={<Loading/>}>
                <RequireAuth>
                    <Routes>

                        <Route path="/" element={<Suspense fallback={<Loading/>}><Home /></Suspense>}>
                            <Route path="vattu" element={
                                <Suspense fallback={<Loading/>}>
                                        <VatuComponent/>
                                </Suspense> } />
                            <Route
                                path="nhan-vien"
                                element={<Suspense fallback={<Loading/>}><NhanVienComponen /></Suspense>}
                            />
                        </Route>
                        <Route path="/user" element={<Suspense fallback={<Loading/>}><Profile /></Suspense>} >
                            <Route path="thong-tin" element={<ThongTinCaNhan/>} />
                        </Route>
                        </Routes>
                </RequireAuth>
                <Routes>
                    <Route path="/auth" element={<Suspense fallback={<Loading/>}><Auth /></Suspense>}>
                        <Route path="login" element={<Suspense fallback={<Loading/>} ><Login /></Suspense>} />
                        <Route path="register" element={<Suspense fallback={<Loading/>} ><Register /></Suspense>} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};
export default WebRoute;
