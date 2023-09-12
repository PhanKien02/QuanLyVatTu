import { React, useEffect, useState } from "react";
import styles from "./XuatNhapKhoComponent.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function XuatNhapKhoComponent() {
    const [options, setOption] = useState("0");
    const navigate = useNavigate();
    useEffect(() => {
        if (options == "0") navigate("xuat-kho");
        if (options == "1") navigate("nhap-kho");
    }, [options]);
    const handleSetOption = (event) => {
        setOption(event.target.value);
    };
    return (
        <div className="container">
            <h1 className={`${styles.title}`}>Xuất Nhập Kho</h1>
            <div className="row">
                <select
                    onChange={handleSetOption}
                    className={`${styles.option}`}>
                    <option value={0}><h3>Xuất Kho</h3></option>
                    <option value={1}><h3>Nhập Kho</h3></option>
                </select>
            </div>
            <Outlet />
        </div>
    );
}

export default XuatNhapKhoComponent;
