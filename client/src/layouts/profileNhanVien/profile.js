import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    uploadAvatar,
} from "../../pages/reducer/nhanVienSlide/nhanVienSlide";
import styles from "./profile.module.scss";
function Profile() {
    const dispatch = useDispatch();
    const nhanvien = useSelector((state) => state.nhanvien.entitie);
    const avatar = useRef();
    const handleUpload = (event) => {
        avatar.current = event.target.files[0];
        dispatch(uploadAvatar({ avatar: avatar.current, mNV: nhanvien.mNV }));
    };
    return (
        <div className={`container profile`}>
            <h3>{`Thông tin nhân viên `}</h3>
            <div className={`row ${styles.profile_name}`}>
                <form className="col-md-3 ">
                    <label htmlFor="upload">
                        <div className={`${styles.avatar}`}>
                            <img src={nhanvien.avatar} alt="avatar"></img>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="upload"
                        name="upload"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                        accept="image/png,image/jpeg,image/jpg"
                    />
                </form>
                <div className={`col-md-5  ${styles.name}`}>
                    <h2> {nhanvien.tenNhanVien}</h2>
                    <h4
                        className={`${
                            nhanvien.active
                                ? styles.active__active
                                : styles.active__notactive
                        }`}>
                        {nhanvien.active ? "Đang làm việc" : "Đã nghỉ việc"}
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className={`${styles.manage_title}`}>
                        <Link to="thong-tin">Thông tin cá nhân</Link>
                    </div>
                    <div className={`${styles.manage_title}`}>
                        <Link href="###">Quản lý tài khoản</Link>
                    </div>
                    <div className={`${styles.manage_title}`}>
                        <Link href="###">Gửi email</Link>
                    </div>
                </div>
                <div className="col-md-9 mt-5">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
export default Profile;
