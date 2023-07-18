import React, { useEffect, useState, } from 'react';
import styles from "./formNhanVien.module.scss"
import  Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getKhuVuc } from '../../../reducer/khuvuc/khuVuc';
import { addNhanVien } from '../../../reducer/nhanVienSlide/nhanVienSlide';
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width:"900px",
        height:"450px",
        transform: "translate(-50%, -50%)",
        backgroundColor:"#80cce1"
    },
};
function FormNhanVien(props) {
    const dispath = useDispatch();
    const khuVucs = useSelector(state => state.khuvuc.entities)
    const [display,setdisplay] = useState(false)
    const nhanvien =props.NhanVien
    const [message,setMessage] = useState("")
    const [tenNhanVien, setTenNhanVien ] = useState();
    const [soDienThoai, setSoDienThoai ] = useState();
    const [khuVuc, setkhuVuc ] = useState();
    const [ngaySinh,setNgaySinh] = useState();
    const [email,setEmail] = useState();
    const [gioiTinh,setGioiTinh] = useState();
    const [trangThai,setTrangThai] = useState();
    useEffect(()=>{
        dispath(getKhuVuc())
        setdisplay(props.display)
    },[dispath,props])
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log("add");
        const Entity = {
            tenNhanVien: tenNhanVien,
            email: email,
            ngaySinh:ngaySinh,
            soDienThoai: soDienThoai,
            gioiTinh:gioiTinh,
            mKV: khuVuc,
            active: trangThai,
        }
        dispath(addNhanVien(Entity));
        handleCloseForm("thêm nhân viên thành công")
    }
    const handleChangeTenNhanVien = (event) =>{
        setTenNhanVien(event.target.value)
    }
    const handleChangeSoDienThoai = (event) =>{
        setSoDienThoai(event.target.value)
    }
    const handleChangeKhuVuc = (event) =>{
        setkhuVuc(event.target.value)
    }
    const handleChangeNgaySinh = (event) =>{
        setNgaySinh(event.target.value)
    }
    const handleChangeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handleChangeGioiTinh = (event) =>{
        setGioiTinh(event.target.value)
    }
    const handleChangeTrangThai = (event) =>{
        setTrangThai(event.target.value)
    }
    const handleCloseForm = (message)=>{
            props.closeForm(message)
    }
    return ( 
        <div>
            <Modal  
                isOpen={display} 
                style={customStyles}  
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}>
                <h4>{nhanvien?"Sửa thông tin nhân viên":"Thêm nhân viên mới"}</h4>
                <form className={`${styles.form}  d-flex flex-column`} onSubmit={handleSubmit}>
                            <div className="group d-flex justify-content-between">
                                <div className={`form-group ${styles.group} `}>
                                    <label htmlFor="tenNhanVien">Tên Nhân Viên</label>
                                    <input   required type="text" className="form-control" name="tenNhanVien" id="tenNhanVien" placeholder="Nhập tên nhân viên" onChange={handleChangeTenNhanVien}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tenVatTu">Ngày sinh</label>
                                    <input  type="date" required className="form-control" id="tenVatTu" name="tenVatTu" placeholder="Nhập tên vật tư" onChange={handleChangeNgaySinh}/>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input required type="text"  className="form-control" name="phone" id="phone" placeholder="Nhập số điện thoại" onChange={handleChangeSoDienThoai}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input required type="email" className="form-control" name="email" id="email" placeholder="Nhập Email" onChange={handleChangeEmail} />
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="gioiTinh">Giới tính</label>
                                    <select required  className="form-control" id="gioiTinh" name="gioiTinh" onChange={handleChangeGioiTinh}>
                                        <option value=""/>
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trangThai"> Trạng Thái</label>
                                    <select required name="trangThai" className="form-control" id="trangThai" onChange={handleChangeTrangThai} >
                                    <option/>
                                    <option value={true} >Hoạt động</option>
                                    <option value={false} >Khóa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-start">
                                <div className="form-group">
                                    <label htmlFor="khuvuc"> Khu Vực</label>
                                    <select required name="khuvuc" className="form-control" id="khuVuc" onChange={handleChangeKhuVuc}>
                                    <option value="" key="" />
                                        {
                                            khuVucs.map(kv =>{
                                                return (
                                                <option selected={khuVuc === kv.mkhu ? true : false } key={kv.mkhu} value={kv.mkhu}>{kv.tenKhuVuc}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <h5 className={`text-danger mt-2`}>{message || undefined}</h5>
                            </div>
                            <hr/>
                            <div className="group d-flex justify-content-end">
                                <div className="form-group">
                                    <button type="reset" className="btn btn-dark" onClick={()=>handleCloseForm("")} >Hủy</button>
                                    <button type="submit" className={`btn btn-success ${styles.submit}`}>OK</button>
                                </div>
                            </div>
                        </form>
            </Modal>
        </div>  
    );
}

export default FormNhanVien;