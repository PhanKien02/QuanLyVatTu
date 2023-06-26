import  React, { useEffect,useState }  from 'react';
import styles from "./nhanVienComponent.module.scss";
import formatDateToClient from "../../../../configs/formatDate";
import FormNhanVien from '../FormNhanVien/formNhanVien';
import {getALlNhanVIen} from "../../../reducer/nhanVienSlide/nhanVienSlide"
import { useDispatch,useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
const NhanVienComponent = ()=>{ 
    const dispatch = useDispatch();  
    const nhanviens = useSelector(state => state.nhanvien.entities)
    const [displayForm,setdisplayForm] = useState(false);
    const [displayModalDelete,setdisplayModalDelete] = useState(false);
    const [VattuDelete,setVattuDelete] = useState();
    const [FormData,setFormData] = useState(null);
    const [message,setMessage] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getALlNhanVIen())
    },[dispatch])
    const handelShowForm = (data)=>{
        setdisplayForm(true)
        setFormData(data)
    }
    const handelXemThongTin= (id)=>{
        navigate(`/user/${id}`)
    }
    const handelCloseForm = (message)=>{
        dispatch(getALlNhanVIen())
        setMessage(message)
        setdisplayForm(false)
        setFormData(null)
    }
    const handelShowModalDelete = (vattu) =>{
        setdisplayModalDelete(true)  
        setVattuDelete(vattu)
    }
    const handelCloseModalDelete = (message) =>{
        dispatch(getALlNhanVIen())
        setMessage(message)
        setdisplayModalDelete(false)  
        setVattuDelete(null)
    }
    return (
        <div className='container'>
            <h1 className={`${styles.title}`}>Nhân Viên</h1>
            <div className="row d-flex justify-content-between mb-3">
                <div className="col-md-6">
                        <h5 className={`text-info mt-2`}>{message || null}</h5>
                </div>
                <div className="col-md-6">
                    <button className={`btn btn-success ${styles.add}`} onClick={()=>handelShowForm(null)}>
                        Thêm Nhân Viên
                    </button>
                </div>
            </div>
            <div className='row'>
            <table className='table table-striped table-bordered col-md-11'>
                <thead className='bg-info'>
                    <tr>
                            <td>Tên Nhân Viên</td>
                            <td>Số Điện Thoại</td>
                            <td>Email</td>
                            <td>Ngày sinh</td>
                            <td>Giới tính</td>
                            <td>Khu Vực</td>
                            <td>Trạng thái</td>
                            <td>Action</td>
                    </tr>
                </thead> 
                <tbody>
                    {
                        nhanviens.map(nhanvien=>{
                            return (
                                <tr key={nhanvien.mNV}>
                                    <td>{nhanvien.tenNhanVien}</td>
                                    <td>{nhanvien.soDienThoai}</td>
                                    <td>{nhanvien.email}</td>
                                    <td>{nhanvien.ngaySinh ? formatDateToClient(nhanvien.ngaySinh): "Đang cập nhật"}</td>
                                    <td>{nhanvien.gioiTinh?"Nam":"Nữ"}</td>
                                    <td>{nhanvien.KhuVuc.tenKhuVuc}</td>
                                    <td className={nhanvien.active ? "text-success" : "text-danger"}>{nhanvien.active ?" Đã kích hoạt":"Đã Khóa"}</td>
                                    <td>
                                        <button className={`btn btn-primary ${styles.action}`} onClick={()=>handelXemThongTin(nhanvien.mNV)} >Xem thông tin</button>
                                        <button className={`btn btn-danger ${styles.action}`} onClick={() =>handelShowModalDelete(nhanvien)} >Khóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>  
            </table>
            </div>
            {displayForm && <FormNhanVien display={displayForm} closeForm={handelCloseForm} NhanVien = {FormData}/>}
            {/* {displayModalDelete && <ModalDelete display = {displayModalDelete} closeModal = {handelCloseModalDelete} Vattu = {VattuDelete} />} */}
        </div>
    )
}
export default NhanVienComponent
