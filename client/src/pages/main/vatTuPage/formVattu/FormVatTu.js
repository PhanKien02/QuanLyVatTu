import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./FormVaTu.module.scss";
import server from "./FormVatTu.Server"
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width:"900px",
        height:"500px",
        transform: "translate(-50%, -50%)",
        backgroundColor:"#80cce1"
    },
};
const FormVatTu = (props) => {
    //*  set up data
    const [display, setdisplay] = useState(false);
    const [listLoai,setListLoai] = useState([])
    const [listKhuVuc,setListkhuVuc] = useState([])
    const [listChungLoai,setListChungLoai] = useState([])
    const [title,setTitle] = useState("")
    const donViTinh = ["Tấn","Khối","Cây","Kg","Viên"]
    const [message,setMessage] = useState()
    //* set up value form
    const [maVtValue,setMaVtValue] = useState()
    const [tenVtValue,settenVtValue] = useState()
    const [soLuongValue,setsoLuongValue] = useState()
    const [donGiaValue,setdonGiaValue] = useState()
    const [donViTinhValue,setdonViTinhValue] = useState()
    const [chungLoaiValue,setChungLoaiValue]= useState()
    const [loaiValue,setloaiValue] = useState()
    const [khuVucValue,setkhuVucValue] = useState()
    useEffect(()=>{
        fetchData();
        setdisplay(props.display);
        if(props.Vattu)
        {
            setTitle("Sửa vật tư");
            initValue(props.Vattu)
        }
        else
            setTitle("Thêm vật tư");
    },[])
    //* fetch data server
const fetchData = async ()=>{
    const khuvucs= await  server.getAllKhuVuc();
    if(khuvucs)
        setListkhuVuc(khuvucs.data);
    const chungLoaiVatTus = await server.getALLChungLoai();
    if(chungLoaiVatTus)
        setListChungLoai(chungLoaiVatTus.data);  
    const loaiVatTus = await server.getALLLoaiVatTu();
    if(loaiVatTus)    
        setListLoai(loaiVatTus.data);  
} 
// * init value update vattu
const initValue =(data) =>{
    setChungLoaiValue( data.LoaiVatTu.mCLVT);
    setMaVtValue(data.mVT) ;
    settenVtValue( data.tenVatTu);
    setsoLuongValue(data.soLuong);
    setdonGiaValue (data.donGia) ;
    setdonViTinhValue (data.donViTinh)
    setloaiValue(data.LoaiVatTu.mLVT) ;
    setkhuVucValue (data.KhuVuc.mkhu);
}
// * set value form
const handleChangeMaVT =(event)=>{
    setMaVtValue(event.target.value)
}
const handleChangeTenVT =(event)=>{
    settenVtValue( event.target.value)
}
const handleChangeSoLuongVT =(event)=>{
    setsoLuongValue(event.target.value) 
}
const handleChangeDonGiaVT =(event)=>{
    setdonGiaValue(event.target.value)
}
const handleChangeDonViTinhVT =(event)=>{
    setdonViTinhValue(event.target.value) ;
}
const handleChangechungloaiVT =(event)=>{
    setChungLoaiValue(event.target.value);
}
const handleChangeloaiVT =(event)=>{
    setloaiValue(event.target.value);
}
const handleChangeKhuVuc =(event)=>{
    setkhuVucValue( event.target.value)
}

const handleCloseForm = (message)=>{
    setdisplay(false)
    props.closeForm(message)
}
const handleSubmit = (event)=>{
    event.preventDefault();
    if(props.Vattu)
        handleUpdateVattu()
    else
        handleCreate()
}
const handleUpdateVattu = async () =>{
    const Vattu = {
        mVT: maVtValue,
        tenVatTu: tenVtValue,
        donViTinh: donViTinhValue,
        LoaiVatTuId:loaiValue,
        soLuong : soLuongValue,
        donGia: donGiaValue,
        khuVucId : khuVucValue
    }
    const update= await server.updateVattu(Vattu)
    if(update.data)
    {
        handleCloseForm(update.message)
    }
    else
        setMessage(update.message)
}
const handleCreate = async () =>{
    const Vattu = {
        mVT: maVtValue,
        tenVatTu: tenVtValue,
        donViTinh: donViTinhValue,
        LoaiVatTuId:loaiValue,
        soLuong : soLuongValue,
        donGia: donGiaValue,
        khuVucId : khuVucValue
    }
    const create= await server.createVattu(Vattu)
    if(create.data)
    {
        handleCloseForm(create.message)
    }
    else
        setMessage(create.message)
}
    return (
        <div>
            <Modal
                isOpen={display} 
                style={customStyles}  
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
                >
                <h2>{title}</h2>
                <form className={`${styles.form}  d-flex flex-column`} onSubmit={handleSubmit}>
                            <div className="group d-flex justify-content-between">
                                <div className={`form-group ${styles.group} `}>
                                    <label htmlFor="maVatTu">Mã vật Tư</label>
                                    <input value={maVtValue} onChange={handleChangeMaVT} disabled={props.Vattu?true:false }  required type="text" className="form-control" name="maVatTu" id="maVatTu" placeholder="Nhập mã vật tư"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tenVatTu">Tên vật Tư</label>
                                    <input value={tenVtValue} onChange={handleChangeTenVT} type="text" required className="form-control" id="tenVatTu" name="tenVatTu" placeholder="Nhập tên vật tư"/>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="dongia">Đơn giá</label>
                                    <input value={donGiaValue} onChange={handleChangeDonGiaVT} required type="number"  pattern="[+]?[0-9]" className="form-control" name="dongia" id="dongia" placeholder="Nhập đơn giá" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="donvitinh">Đơn vị tính</label>
                                    <select onChange={handleChangeDonViTinhVT} required className="form-control"    name="donViTinh" id="donViTinh">
                                    <option value="" key="0" />
                                        {
                                            donViTinh.map((dvt) =>{
                                                return (<option selected={ donViTinhValue === dvt || undefined} key={dvt} value={dvt}>{dvt}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="chungLoaiVatTu">Chủng loại vật tư</label>
                                    <select  onChange={handleChangechungloaiVT} className="form-control" id="chungLoaiVatTu" >
                                    <option value="" key="0" />
                                        {
                                            listChungLoai.map(chungloai =>{
                                                return (
                                                    <option selected={ chungloai.mCLVT === chungLoaiValue  ? true : undefined}
                                                            key={chungloai.mCLVT} 
                                                            value={chungloai.mCLVT}> 
                                                            {chungloai.tenChungLoaiVatTu}
                                                            </option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LoaiVatTu"> loại vật tư</label>
                                    <select required name="loaiVattu"onChange={handleChangeloaiVT}  className="form-control" id="LoaiVatTu" >
                                    <option value="" key="0" />
                                        {
                                            listLoai.filter(loaiVt =>{
                                                return loaiVt.mCLVT == chungLoaiValue
                                            }).map(loaiVT =>{
                                                return (
                                                    <option selected={loaiVT.mLVT === loaiValue ?true : undefined} key={loaiVT.mLVT} value={loaiVT.mLVT}>{loaiVT.tenLoaiVatTu}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="chungLoaiVatTu">Số lượng</label>
                                    <input value={soLuongValue} onChange={handleChangeSoLuongVT} required type="number" pattern="[+]?[0-9]" className="form-control" id="soLuong" name="soLuong" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="khuvuc"> Khu Vực</label>
                                    <select required name="khuvuc" onChange={handleChangeKhuVuc}  className="form-control" id="khuVuc" >
                                    <option value="" key="0" />
                                        {
                                            listKhuVuc.map(kv =>{
                                                return (
                                                <option selected={khuVucValue === kv.mkhu ? true : false } key={kv.mkhu} value={kv.mkhu}>{kv.tenKhuVuc}</option>
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
                                    <button type="reset" className="btn btn-dark" onClick={()=>handleCloseForm()} >Hủy</button>
                                    <button type="submit" className={`btn btn-success ${styles.submit}`}>OK</button>
                                </div>
                            </div>
                        </form>
            </Modal>
        </div>
    );
};
export default FormVatTu;
