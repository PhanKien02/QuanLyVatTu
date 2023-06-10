import React, { useEffect, useRef, useState } from "react";
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
    //* value
    const maVtValue = useRef()
    const tenVtValue = useRef()
    const soLuongValue = useRef()
    const donGiaValue = useRef()
    const donViTinhValue = useRef()
    const chungLoaiValue = useRef()
    const loaiValue = useRef()
    const khuVucValue = useRef()

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
const fetchData = async ()=>{
    const khuvucs= await  server.getAllKhuVuc();
    setListkhuVuc(khuvucs.data);
    const chungLoaiVatTus = await server.getALLChungLoai();
    setListChungLoai(chungLoaiVatTus.data);  
} 
const initValue =(data) =>{
    maVtValue.current = data.mVT;
    tenVtValue.current = data.tenVatTu;
    soLuongValue.current= data.soLuong;
    donGiaValue.current=data.donGia ;
    donViTinhValue.current=data.donViTinh
    chungLoaiValue.current=data.LoaiVatTu.mCLVT
    loaiValue.current=data.mLVT
    khuVucValue.current=data.KhuVuc.mkhu
}
const handleCloseForm = ()=>{
    setdisplay(false)
    props.closeForse()
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
                <form className={`${styles.form_addVatTu}  d-flex flex-column`}>
                            <div className="group d-flex justify-content-between">
                                <div className={`form-group ${styles.group} `}>
                                    <label htmlFor="maVatTu">Mã vật Tư</label>
                                    <input value={maVtValue.current} disabled={maVtValue.current?true:false }  required type="text" className="form-control" name="maVatTu" id="maVatTu" placeholder="Nhập mã vật tư"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tenVatTu">Tên vật Tư</label>
                                    <input value={tenVtValue.current} type="text" required className="form-control" id="tenVatTu" name="tenVatTu" placeholder="Nhập tên vật tư"/>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="dongia">Đơn giá</label>
                                    <input value={donGiaValue.current} required type="number"  pattern="[+]?[0-9]" className="form-control" name="dongia" id="dongia" placeholder="Nhập đơn giá" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="donvitinh">Đơn vị tính</label>
                                    <select  required className="form-control" name="donViTinh" id="donViTinh">
                                        {
                                            donViTinh.map((dvt) =>{
                                                return (<option selected={ donViTinhValue.current=== dvt || undefined} key={dvt} value={dvt}>{dvt}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="chungLoaiVatTu">Chủng loại vật tư</label>
                                    <select className="form-control" id="chungLoaiVatTu" >
                                        {
                                            listChungLoai.map(chungloai =>{
                                                return ( <option selected={chungLoaiValue.current === chungloai.mCLVT || undefined} key={chungloai.mCLVT} value={chungloai.mCLVT}>{chungloai.tenChungLoaiVatTu}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LoaiVatTu"> loại vật tư</label>
                                    <select required name="loaiVattu"  className="form-control" id="LoaiVatTu" >
                                    
                                    </select>
                                </div>
                            </div>
                            <div className="group d-flex justify-content-between">
                                <div className="form-group">
                                    <label htmlFor="chungLoaiVatTu">Số lượng</label>
                                    <input value={soLuongValue.current} required type="number" pattern="[+]?[0-9]" className="form-control" id="soLuong" name="soLuong" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="khuvuc"> Khu Vực</label>
                                    <select required name="khuvuc"  className="form-control" id="LoaiVatTu" >
                                        {
                                            listKhuVuc.map(kv =>{
                                                return (
                                                <option selected={khuVucValue.current == kv.mkhu ? true: undefined} key={kv.mkhu} value={kv.mkhu}>{kv.tenKhuVuc}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <hr/>
                            <div className="group d-flex justify-content-end">
                                <div className="form-group">
                                    <button type="reset" className="btn btn-dark" onClick={handleCloseForm} >Hủy</button>
                                    <button type="submit" className={`btn btn-success ${styles.submit}`}>Thêm</button>
                                </div>
                            </div>
                        </form>
            </Modal>
        </div>
    );
};
export default FormVatTu;
