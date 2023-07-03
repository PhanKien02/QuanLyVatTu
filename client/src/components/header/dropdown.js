import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {action} from "../../pages/reducer/nhanVienSlide/userSlide"
import React, {useEffect, useRef } from 'react';
import { getNhanVIenById } from "../../pages/reducer/nhanVienSlide/nhanVienSlide";

function BasicExample(props) {
    const user = useRef( props.login.user)
    const dispath = useDispatch()
    const handleLogout = (event) => {
        event.preventDefault();
        dispath(action.LOG_OUT())
    };
    useEffect(()=>{
        dispath(getNhanVIenById(user.current.NhanVien.mNV))
    },[dispath])
    return (
        <div style={{marginLeft : 250+"px"}}>
            <DropdownButton
                variant='info'
                align="down"
                title={user.current.NhanVien.tenNhanVien}
                id="dropdown-menu-align-down">
                <p><Link to={`user/thong-tin`}>Profile</Link></p>
                <p>
                    <Link onClick={handleLogout}>Logout</Link>
                </p>
            </DropdownButton>
        </div>
    );
}

export default BasicExample;
