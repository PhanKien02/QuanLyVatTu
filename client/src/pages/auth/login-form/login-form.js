import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import service from "./login.service";
import request from '../../../utils/httpRequesr';
import styles from "./login-from.module.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/context/authContext"
const LoginForm = () => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState('')
    const navigate = useNavigate();
    const Auth = useContext(AuthContext)
    const handleChangeUserName = (event) =>{
        setUserName(event.target.value)
    }
    const handleChangePassword= (event) =>{
        setPassword(event.target.value)
    }
    const handleLogin = (event) => {
        event.preventDefault();        
        login()
    };
    const login= async ()=>{
        const response =  await service.Login(userName, password);
        if(response.data.user)
            {
                request.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                Auth.setUser( response.data.user)
                Auth.setToken( response.data.token)
                navigate("/")
            }
        else{
            setMessage(response.message);
            setPassword("")
            setUserName("")
        }
    }   
    return (
        <div className={`${styles.login} container`}>
            <h1 className="text-center text-white">Đăng nhập</h1>
            <form className={`${styles.form}`} onSubmit={handleLogin}>
                <div className="form-group row mt-5">
                    <label>
                        useName:
                        <input className={`${styles.input}`} type="text" value={userName} onChange={handleChangeUserName} />
                    </label>
                </div>
                <div className="form-group row mt-5">
                    <label>
                        password: 
                        <input
                        className={`${styles.input}`}
                            type="password" value={password} onChange={handleChangePassword}
                        />
                    </label>
                </div>
                <div className="form-group row mt-4">
                    <div className={`d-flex justify-content-start ${styles.forgot_password}`}>
                        <Link to="/">Quên mật khẩu</Link>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-md-6">
                        <p className="text-center ml-4 text-danger">{message}</p>
                    </div>
                </div>
                <div className="row mb-3 ">
                    <div>
                        <input
                            type="submit"
                            value="Đăng nhập"
                            className="btn btn-success"
                        />
                    </div>
                </div>
            <span className={`${styles.register}`}>
            <Link to="/auth/sign-up">Đăng kí tài khoản</Link>
            </span>
            </form>
        </div>
    );
};
export default LoginForm;
