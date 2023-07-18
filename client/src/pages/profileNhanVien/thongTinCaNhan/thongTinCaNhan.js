import React, { useEffect, useState } from "react";
import styles from "./thongTinCaNhan.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getKhuVuc } from "../../reducer/khuvuc/khuVuc";
import { getDiaChis } from "../../reducer/diaChiSlide/diaChiSlide";
import formatDateToClient from "../../../configs/formatDate";
function ThongTinCaNhan() {
    const dispath = useDispatch();
    const nhanvien = useSelector((state) => state.nhanvien.entitie);
    const listKhuVuc = useSelector((state) => state.khuvuc.entities);
    const diachis = useSelector((state) => state.diaChi.entities);
    const [quanhuyens, setQuanHuyens] = useState([]);
    const [xaPhuongs, setXaPhuongs] = useState([]);
    const [ngaysinh, setNgaySinh] = useState();
    const [gioiTinh, setGioiTinh] = useState(true);
    const [email, setEmail] = useState();
    const [sdt, setSDT] = useState();
    const [khuVuc, setKhuVuc] = useState(true);
    const [tinhThanh, setTinhThanh] = useState();
    const [quanHuyen, setQuanHuyen] = useState();
    const [xaPhuong, setXaPhuong] = useState();
    const [disabled, setDisabled] = useState(true);
    const initForm = () => {
        setNgaySinh(nhanvien.ngaysinh);
        setEmail(nhanvien.email);
        setGioiTinh(nhanvien.gioiTinh);
        setSDT(nhanvien.soDienThoai);
        setKhuVuc(nhanvien.mKV);
        setTinhThanh(nhanvien.XaPhuong.QuanHuyen.TinhThanh.mTT);
        setQuanHuyen(nhanvien.XaPhuong.QuanHuyen.mQH);
        setXaPhuong(nhanvien.XaPhuong.mXP);
    };

    const onchangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onchangeSDT = (event) => {
        setSDT(event.target.value);
    };
    const onchangeGioiTinh = (event) => {
        setGioiTinh(event.target.value);
    };
    const activeEdit = () => {
        disabled ? setDisabled(false) : setDisabled(true);
    };
    const onchangeTinhThanh = (event) => {
        setTinhThanh(event.target.value);
        setQuanHuyens(
            diachis.find((diachi) => {
                return diachi.mTT == event.target.value;
            }).QuanHuyen
        );
    };
    const onchangeQuanHuyen = (event) => {
        setQuanHuyen(event.target.value);
        setXaPhuongs(
            quanhuyens.find((quanhuyen) => {
                return quanhuyen.mQH == event.target.value;
            }).XaPhuong
        );
    };
    const onchangeXaPhuong = (event) => {
        setXaPhuong(event.target.value);
    };
    useEffect(() => {
        dispath(getKhuVuc());
        dispath(getDiaChis());
        initForm();
    }, [dispath,nhanvien]);
    return (
        <div className={`container`}>
            <div className="row d-flex justify-content-end mt-2">
                <div className="col-md-3">
                    <button
                        className="btn btn-primary border rounded-circle"
                        onClick={activeEdit}>
                        <FontAwesomeIcon icon="fa-solid fa-pencil" size="lg" />
                    </button>
                </div>
            </div>
            <div className={`row mt-3 ${styles.info}`}>
                <form className="form">
                    <div className="group d-flex justify-content-between col-md-12 mt-2">
                        <div className={`form-group`}>
                            <input
                                disabled={disabled}
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
                                disabled={disabled}
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
                                value={formatDateToClient(ngaysinh)}
                                disabled={disabled}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                type="select"
                                className="form-control"
                                id="gioiTinh"
                                name="gioiTinh"
                                onChange={onchangeGioiTinh}
                                disabled={disabled}
                                value={gioiTinh ? true : false}>
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
                                disabled={disabled}
                                name="khuvuc">
                                {listKhuVuc.map((kv) => {
                                    return (
                                        <option
                                            selected={
                                                khuVuc === kv.mKhu
                                                    ? true
                                                    : false
                                            }
                                            value={kv.mKhu}
                                            key={kv.mKhu}>
                                            {kv.tenKhuVuc}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="group d-flex justify-content-between col-md-12 mt-4">
                        <div className="form-group">
                            <select
                                type="text"
                                className="form-control"
                                id="tinhThanh"
                                disabled={disabled}
                                value={tinhThanh}
                                onChange={onchangeTinhThanh}
                                name="tinhThanh">
                                {diachis.map((diachi) => {
                                    return (
                                        <option
                                            selected={
                                                diachi.mTT === tinhThanh
                                                    ? true
                                                    : false
                                            }
                                            value={diachi.mTT}
                                            key={diachi.mTT}>
                                            {diachi.tenTinhThanh}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                id="quanHuyen"
                                value={quanHuyen}
                                defaultValue={quanHuyen}
                                disabled={disabled}
                                onChange={onchangeQuanHuyen}
                                name="quanHuyen">
                                {quanhuyens.map((quanhuyen) => {
                                    return (
                                        <option
                                            selected={
                                                quanhuyen.mQH === quanHuyen
                                                    ? true
                                                    : false
                                            }
                                            key={quanhuyen.mQH}
                                            value={quanhuyen.mQH}>
                                            {quanhuyen.tenQuanHuyen}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                type="text"
                                className="form-control"
                                id="xaPhuong"
                                disabled={disabled}
                                onChange={onchangeXaPhuong}
                                value={xaPhuong}
                                name="xaPhuong">
                                {xaPhuongs.map((xaphuong) => {
                                    return (
                                        <option
                                            selected ={xaphuong.mXP == xaPhuong}
                                            key={xaphuong.mXP}
                                            value={xaphuong.mXP}>
                                            {xaphuong.tenXaPhuong}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            disabled={disabled}
                            type="submit"
                            value="Lưu"
                            className="btn btn-success"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThongTinCaNhan;
