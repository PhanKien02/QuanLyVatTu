import  React, { useEffect,useState }  from 'react';
import service from './vatTu.service'
import styles from "./vatuComponent.module.scss";
import FormVatTu from '../formVattu/FormVatTu';
import ModalDelete from'../modalDeleteVattu/deleteVattu'
const VatuComponent = ()=>{ 

    const [vatus,setListVatu] = useState([]);
    const [displayForm,setdisplayForm] = useState(false);
    const [displayModalDelete,setdisplayModalDelete] = useState(false);
    const [VattuDelete,setVattuDelete] = useState();
    const [FormData,setFormData] = useState(null);
    const [message,setMessage] = useState("");
    useEffect(()=>{
        fetchdata()
    },[])
    const fetchdata = async ()=>{
        const dataVatTu= await service.getALlVatu() 
            if(dataVatTu)
                setListVatu(dataVatTu.data);            
    }
    const handelShowForm = (data)=>{
        setdisplayForm(true)
        setFormData(data)
    }
    const handelCloseForm = (message)=>{
        fetchdata()
        setMessage(message)
        setdisplayForm(false)
        setFormData(null)
    }
    const handelShowModalDelete = (vattu) =>{
        setdisplayModalDelete(true)  
        setVattuDelete(vattu)
    }
    const handelCloseModalDelete = (message) =>{
        fetchdata()
        setMessage(message)
        setdisplayModalDelete(false)  
        setVattuDelete(null)
    }
    return (
        <div className='Vatu container'>
            <h1 className={`${styles.title}`}>Vật Tư</h1>
            <div className="row d-flex justify-content-between mb-3">
                <div className="col-md-6">
                        <h5 className={`text-info mt-2`}>{message || null}</h5>
                </div>
                <div className="col-md-6">
                    <button className={`btn btn-success ${styles.add}`} onClick={()=>handelShowForm(null)}>
                        Thêm Vật tư
                    </button>
                </div>
            </div>
            <div className='row'>
            <table className='table table-striped table-bordered col-md-11'>
                <thead className='bg-info'>
                    <tr>
                        <td>Mã Vật Tư</td>
                            <td>Tên Vật Tư</td>
                            <td>Đơn vị tính</td>
                            <td>Số lượng</td>
                            <td>Đơng giá</td>
                            <td>Loại Vật Tư</td>
                            <td>Khu Vực</td>
                            <td>Action</td>
                    </tr>
                </thead> 
                <tbody>
                    {
                        vatus.map(vatu=>{
                            return (
                                <tr key={vatu.mVT}>
                                    <td>{vatu.mVT}</td>
                                    <td>{vatu.tenVatTu}</td>
                                    <td>{vatu.donViTinh}</td>
                                    <td>{vatu.soLuong}</td>
                                    <td>{vatu.donGia}</td>
                                    <td>{vatu.LoaiVatTu.tenLoaiVatTu}</td>
                                    <td>{vatu.KhuVuc.tenKhuVuc}</td>
                                    <td>
                                        <button className={`btn btn-primary ${styles.action}`}>Xem</button>
                                        <button className={`btn btn-warning ${styles.action}`} onClick={()=>handelShowForm(vatu)} >Sửa</button>
                                        <button className={`btn btn-danger ${styles.action}`} onClick={() =>handelShowModalDelete(vatu)} >Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>  
            </table>
            </div>
            {displayForm && <FormVatTu display={displayForm} closeForm={handelCloseForm} Vattu = {FormData}/>}
            {displayModalDelete && <ModalDelete display = {displayModalDelete} closeModal = {handelCloseModalDelete} Vattu = {VattuDelete} />}
        </div>
    )
}
export default VatuComponent
