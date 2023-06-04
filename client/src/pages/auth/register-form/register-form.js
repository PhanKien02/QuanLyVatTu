import React, { useState } from "react"
import { Link } from "react-router-dom";
import service from "./register.service";
import "./register-form.scss"
const Register = ()=>{
    const [useName,setUseName] = useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage] = useState('')
    const handleChangeUseName =(event)=>{
        setUseName(event.target.value)
    }
    const handleChangePassword =(event)=>{
        setPassword(event.target.value)
    }
    const handelSubmit = (event)=> {
        event.preventDefault()
        service(useName,password)
    }
    return (
        <div className='register container'>
            <h1 className='text-center text-white'>Đăng ký </h1>
                <form>
                    <div className="form-group row mt-4">
                        <label>
                                useName: 
                                <input
                                    type="text" onChange={handleChangeUseName}
                                />
                        </label>
                    </div>
                    <div className="form-group row mt-5">
                        <label>
                            password: 
                            <input
                                type="password" onChange={handleChangePassword}
                            />
                        </label>
                    </div>
                    <div className="form-group row mt-5 ml-3">
                        <label>
                            Nhập lại mật khẩu: 
                            <input
                                type="password" 
                            />
                        </label>
                    </div>
                    <p>{message}</p>
                    <div className="form-group row mt-4 mb-3 d-flex justify-content-center" >
                        <div className="">
                            <button type="submit" className="btn btn-success ">register</button>
                        </div>
                    </div>
                        <Link to="/auth/login">Bạn đã có tài khoản</Link>
                </form>
        </div>
    )
}
export default Register;