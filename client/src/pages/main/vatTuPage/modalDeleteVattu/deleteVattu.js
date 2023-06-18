import React, { useEffect, useState } from 'react';
import  Modal  from 'react-modal';
import service from "./delete.Server"
import styles from './deleteVaTu.module.scss'
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width:"600px",
        height:"250px",
        transform: "translate(-50%, -50%)",
        backgroundColor:"#80cce1"
    },
};
const ModalDelete = (props) =>{
    const [display,setdisplay]= useState(false);
    const [VatuDelete,setVattuDelete] = useState(null);
    useEffect(()=>{
        setdisplay(props.display)
        setVattuDelete(props.Vattu)
    },[])
    const handelCloseModal = (message)=>{
        setdisplay(false)
        props.closeModal(message)
    }
    const handelDelete =() =>{
        service.DeleteVattu(VatuDelete.mVT).then((res)=>{
            if(res.data)
                handelCloseModal("Xóa vật tư thành công")
            else
                handelCloseModal("Không thể xóa vật tư vì đã được sử dụng")
        })
        .catch(error=>{
            console.log(error);
            handelCloseModal("Không thể xóa vật tư vì đã được sử dụng")
        })     
    }
    console.log(VatuDelete);
    return (
        <div>
            <Modal
                isOpen={display} 
                style={customStyles}  
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true} >
                <h1 className='text-danger'>Xóa Vật tư</h1>
                <h6>Bạn có muốn xóa vật tư {VatuDelete ? VatuDelete.tenVatTu : undefined}  ko</h6>
                <hr/>
                <div className='d-flex justify-content-end mt-5'>
                    <button type="button" onClick={()=>handelCloseModal("")} name="huy" id="huy" className="btn btn-dark btn-block text-center">Hủy</button>
                    <button type="button" name="success" id="success" className={`btn btn-success btn-block text-center ${styles.action}`} onClick={handelDelete} >OK</button>
                </div>
            </Modal>
        </div>
    );
}
export default ModalDelete;