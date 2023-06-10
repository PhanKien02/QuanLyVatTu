import { React, useState } from "react";
import { Link } from "react-router-dom";
import service from "./login.service";
import styles from "./login-from.module.scss";
const LoginForm = () => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState('')
    const handleChangeUserName = (event) =>{
        setUserName(event.target.value)
    }
    const handleChangePassword= (event) =>{
        setPassword(event.target.value)
    }
    const handleLogin = (event) => {
            event.preventDefault();
            const login= async ()=>{
            const response =  await service.Login(userName, password);
            setMessage(response.data.message);
            setPassword("")
            setUserName("")
        }   
        login()
    };
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
                    <div class="col-md-6">
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
