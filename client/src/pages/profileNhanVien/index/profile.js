import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getNhanVIenById } from '../../reducer/nhanVienSlide/nhanVienSlide';
function Profile() {
    const dispatch = useDispatch();
    const nhanvien = useSelector(state => state.nhanvien.entitie)
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getNhanVIenById(id))
    },[])
    return ( 
        <div>
            <h3>{`Thông tin nhân viên ${nhanvien.tenNhanVien}`}</h3>
            
        </div>
        );
}

export default Profile;