import  React, { useEffect,useState }  from 'react';
import service from './vatTu.service'
import styles from "./vatuComponent.module.scss";
import FormVatTu from '../addVatTu/FormVatTu';
const VatuComponent = ()=>{ 

    const [vatus,setListVatu] = useState([])
    const [displayForm,setdisplayForm] = useState(false)
    const [FormData,setFormData] = useState(null)
    useEffect(()=>{
        const fetchdata = async ()=>{
            const dataVatTu= await service.getALlVatu() 
                if(dataVatTu)
                    setListVatu(dataVatTu.data);            
        }
        fetchdata()
    },[])
    const handelShowForm = (data)=>{
        setdisplayForm(true)
        setFormData(data)
    }
    const handleClose = ()=>{
        setdisplayForm(false)
        setFormData(null)
    }
    return (
        <div className='Vatu container'>
            <h1 className={`${styles.title}`}>Vật Tư</h1>
            <div className="row d-flex justify-content-end mb-3">
                <div className="col-md-5">
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
                                        <button className={`btn btn-danger ${styles.action}`}>Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>  
            </table>
            </div>
            {displayForm && <FormVatTu display={displayForm} closeForse={handleClose} Vattu = {FormData}/>}
        </div>
    )
}
export default VatuComponent
