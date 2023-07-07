import React from "react";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";

function ThongTinCaNhan() {
    const dispath = useDispatch();
    const nhanvien = useSelector((state) => state.nhanvien.entitie);
    return (
        <div className={`${styles.infor} container`}>
            <div className="row d-flex justify-content-end mt-2">
                <div className="col-md-3">
                    <button className="btn btn-primary">Sửa thông tin</button>
                </div>
            </div>
            <form className="row">
                <div className="group d-flex justify-content-between col-md-12">
                    <div className={`form-group d-flex`}>
                        <input
                            disabled
                            required
                            type="text"
                            className="form-control"
                            name="maVatTu"
                            id="maVatTu"
                            placeholder="Nhập mã vật tư"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="tenVatTu"
                            name="tenVatTu"
                            placeholder="Nhập tên vật tư"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ThongTinCaNhan;
