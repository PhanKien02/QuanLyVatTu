import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./layouts/home/home"));
const Auth = lazy(() => import("./layouts/auth/auth"));
const Login = lazy(() => import("./pages/auth/login-form/login-form"));
const Register = lazy(() => import("./pages/auth/register-form/register-form"));
const VatuComponent = lazy(() => import('./pages/main/vatTuPage/index/vatTu.component') );

const WebRoute = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path='vattu' element={<VatuComponent/>} />
                    </Route>
                    <Route path="/auth" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="sign-up" element={<Register />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};
export default WebRoute
