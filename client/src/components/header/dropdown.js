import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {action} from "../../pages/reducer/nhanVienSlide/userSlide"
import React, {useRef } from 'react';

function BasicExample(props) {
    const user = useRef( props.login.user)
    const navigate = useNavigate()
    const dispath = useDispatch()
    const handleLogout = (event) => {
        event.preventDefault();
        dispath(action.LOG_OUT())
    };
    return (
        <div style={{marginLeft : 250+"px"}}>
            <DropdownButton
                variant='info'
                align="down"
                title={user.current.NhanVien.tenNhanVien}
                id="dropdown-menu-align-down">
                <p><Link to={`user/${user.current.NhanVien.mNV}`}>Profile</Link></p>
                <p>
                    <Link onClick={handleLogout}>Logout</Link>
                </p>
            </DropdownButton>
        </div>
    );
}

export default BasicExample;
