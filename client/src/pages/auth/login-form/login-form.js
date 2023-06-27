import { React, useState } from "react";
import {useDispatch} from "react-redux"
import { Link,NavLink } from "react-router-dom";
import service from "./login.service";
import request from '../../../configs/httpRequesr';
import styles from "./login-from.module.scss";
import { useNavigate } from "react-router-dom";
import {action } from "../../reducer/nhanVienSlide/userSlide"
const LoginForm = () => {
    const dispatch = useDispatch()
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState('')
    const navigate = useNavigate();
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
    const login= ()=>{
        service.Login(userName, password).then((response)=>{
            if(response.data.user)
            {
                const user= response.data.user;
                const token= response.data.token;
                request.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                dispatch(action.LOG_IN({user : user, token :token }))
                navigate("/")
            }
            else{
                setMessage(response.message);
                setPassword("")
                setUserName("")
            }
        }).catch(error=>{
            console.log(error);
            setMessage("Không thể đăng nhập");
            setPassword("")
            setUserName("")
        })
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
            <NavLink to="/auth/register">Đăng kí tài khoản</NavLink>
            </span>
            </form>
        </div>
    );
};
export default LoginForm;
