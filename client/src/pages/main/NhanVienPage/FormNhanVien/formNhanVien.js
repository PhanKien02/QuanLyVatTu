import React, { useEffect, useState, } from 'react';
import styles from "./formNhanVien.module.scss"
import  Modal from 'react-modal';
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
    const [display,setdisplay] = useState(false)
    const [nhanvien,setNhanVien] = useState(props.NhanVien)
    const [message,setMessage] = useState("")
    useEffect(()=>{
        setdisplay(props.display)
    })
    const handleSubmit = ()=>{

    }
    const handleCloseForm = ()=>{
            props.closeForm()
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
                                    <input   required type="text" className="form-control" name="tenNhanVien" id="tenNhanVien" placeholder="Nhập tên nhân viên"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tenVatTu">Ngày sinh</label>
                                    <input  type="date" required className="form-control" id="tenVatTu" name="tenVatTu" placeholder="Nhập tên vật tư"/>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input required type="text"className="form-control" name="phone" id="phone" placeholder="Nhập số điện thoại" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input required type="email" className="form-control" name="email" id="email" placeholder="Nhập Email" />
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="gioiTinh">Giới tính</label>
                                    <select required  className="form-control" id="gioiTinh" name="gioiTinh">
                                        <option value=""/>
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trangThai"> Trạng Thái</label>
                                    <select required name="trangThai" className="form-control" id="trangThai" >
                                    <option/>
                                    <option value={true} >Hoạt động</option>
                                    <option value={false} >Khóa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="gioiTinh">Giới tính</label>
                                    <select required  className="form-control" id="gioiTinh" name="gioiTinh">
                                        <option value=""/>
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="khuvuc"> Khu Vực</label>
                                    <select required name="khuvuc" className="form-control" id="khuVuc" >
                                    {/* <option value="" key="0" />
                                        {
                                            listKhuVuc.map(kv =>{
                                                return (
                                                <option selected={khuVucValue === kv.mkhu ? true : false } key={kv.mkhu} value={kv.mkhu}>{kv.tenKhuVuc}</option>
                                                )
                                            })
                                        } */}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <h5 className={`text-danger mt-2`}>{message || undefined}</h5>
                            </div>
                            <hr/>
                            <div className="group d-flex justify-content-end">
                                <div className="form-group">
                                    <button type="reset" className="btn btn-dark" onClick={()=>handleCloseForm()} >Hủy</button>
                                    <button type="submit" className={`btn btn-success ${styles.submit}`}>OK</button>
                                </div>
                            </div>
                        </form>
            </Modal>
        </div>  
    );
}

export default FormNhanVien;