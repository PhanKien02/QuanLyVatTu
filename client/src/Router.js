import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './store/authContext/authProvider';
import RequireAuth from './store/authContext/RequireAuth' 
const Home = lazy(() => import("./layouts/home/home"));
const Auth = lazy(() => import("./layouts/auth/auth"));
const Login = lazy(() => import("./pages/auth/login-form/login-form"));
const Register = lazy(() => import("./pages/auth/register-form/register-form"));
const VatuComponent = lazy(() => import('./pages/main/vatTuPage/index/vatTuComponent') );

const WebRoute = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthProvider>
                    <RequireAuth>
                    <Routes>
                            <Route path="/" element={<Home />} >
                                <Route path='vattu' element={<VatuComponent/>} />
                            </Route>
                    </Routes>
                    </RequireAuth>

                    <Routes>
                        <Route path="/auth" element={<Auth />}>
                            <Route path="login" element={<Login />} />
                            <Route path="sign-up" element={<Register />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </Suspense>
        </Router>
    );
};
export default WebRoute
