import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux";
import formatDateToClient from "../../../configs/formatDate";
function ThongTinCaNhan() {
    const dispath = useDispatch();
    const nhanvien = useSelector((state) => state.nhanvien.entitie);
    // const listKhuVuc = useSelector((state) => state.khuVuc.entities);
    const [ngaysinh, setNgaySinh] = useState();
    const [gioiTinh, setGioiTinh] = useState(true);
    const [email, setEmail] = useState();
    const [sdt, setSDT] = useState();
    const [khuVuc, setKhuVuc] = useState(true);
    const initForm = () => {
        setNgaySinh(nhanvien.ngaysinh);
        setEmail(nhanvien.email);
        setGioiTinh(nhanvien.gioiTinh);
        setSDT(nhanvien.soDienThoai);
        setKhuVuc(nhanvien.KhuVuc.mKhu);
    };
    const onchangeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const onchangeSDT = (event) =>{
        setSDT(event.target.value)
    }
    useEffect(() => {
        // dispath(getKhuVuc());
        initForm();
    }, [dispath, nhanvien]);
    return (
        <div className={`container`}>
            <div className="row d-flex justify-content-end mt-2">
                <div className="col-md-3">
                    <button className="btn btn-primary border rounded-circle"><FontAwesomeIcon icon="fa-solid fa-pencil" size="lg" /></button>
                </div>
            </div>
            <div className={`row mt-3 ${styles.info}`}>
                <form className="form">
                    <div className="group d-flex justify-content-between col-md-12 mt-2">
                        <div className={`form-group`}>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                onChange={onchangeEmail}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="sdt"
                                name="sdt"
                                onChange={onchangeSDT}
                                value={sdt}
                            />
                        </div>
                    </div>
                    <div className="group d-flex justify-content-between col-md-12 mt-4">
                        <div className={`form-group`}>
                            <input
                                type="date"
                                className="form-control"
                                name="ngaySinh"
                                id="ngaySinh"
                                value={ formatDateToClient(ngaysinh) }
                            />
                        </div>
                        <div className="form-group">
                            <select
                                type="select"
                                className="form-control"
                                id="gioiTinh"
                                name="gioiTinh"
                                value={gioiTinh ? true : false}>
                                <option></option>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className="group d-flex justify-content-between col-md-12 mt-4">
                    <div className="form-group">
                            <select
                                type="text"
                                className="form-control"
                                id="khuvuc"
                                name="khuvuc"
                                >
                                {/* {listKhuVuc.map((kv) => {
                                    return (
                                        <option
                                            selected={khuVuc===kv.mKhu?true:false}
                                            value={kv.mKhu}
                                            key={kv.mKhu}>
                                            {kv.tenKhuVuc}
                                        </option>
                                    );
                                })} */}
                            </select>
                        </div>
                        <div className={`form-group`}>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                id="email"
                            />
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThongTinCaNhan;
