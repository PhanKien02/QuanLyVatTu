import  React, { useEffect,useState }  from 'react';
import { Link } from 'react-router-dom';
import service from './vatTu.service'
import "./vatu.component.scss"
import { render } from '@testing-library/react';

const VatuComponent = ()=>{
    const [vatus,setListVatu] = useState([])
    useEffect(()=>{
        const fetchdata = async ()=>{
            const data= await service.getALlVatu() 
                setListVatu(data.data);
        }
        fetchdata()
    },[])
    return (
        <div className='Vatu container'>
            <h1>Vật Tư</h1>
            <div class="row d-flex justify-content-end mb-3">
                <div class="col-md-5">
                <button className='btn btn-success add '>
                    <Link>Thêm Vật tư</Link>
                    </button>
                </div>
            </div>
            <div className='row'>
            <table className='table table-striped  table-bordered col-md-11'>
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
                                        <button className='btn btn-primary'>Xem</button>
                                        <button className='btn btn-warning '>Sửa</button>
                                        <button className='btn btn-danger '>Xóa</button>
                                    </td>
                                </tr>
                            )
                            })
                    }
                </tbody>  
            </table>
            </div>
        </div>
    )
}
export default VatuComponent
