import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import nhanVienService  from "../nhanVienSlide/serverNhanVien"
let session = JSON.parse(sessionStorage.getItem('nhanvien'));
let initialState = session ? session : {
    entities: [],
    entitie: {},
    loading: false,
    message : "",
};

export const getALlNhanVIen = createAsyncThunk(
    'nhanvien/getAllNhanVien',
    async () => {
        try {
            const data=  await nhanVienService.getAllNhanVien();
            return data.data
        } catch (error) {
            console.log("get all nhan vien falild: ",error);
        }
    }
)
export const getNhanVIenById = createAsyncThunk(
    'nhanvien/getNhanVienById',
    async (id) => {
        try {
            const data=  await nhanVienService.getNhanVienById(id);
            return data.data
        } catch (error) {
            console.log("get all nhan vien falild: ",error);
        }
    }
)
export const uploadAvatar = createAsyncThunk("nhanvien/uploadAvatar",async({avatar,mNV},thunkAPI)=>{
    try {
        const res=  await nhanVienService.uploadAvatar(avatar,mNV);
        thunkAPI.dispatch(getNhanVIenById(mNV))
        return res;
    } catch (error) {
        console.log(error);
        return {
            message: "upload avatar thất bại"
        }
    }
})
export const setActiveStaff = createAsyncThunk("nhanvien/setActiveStaff",async ({active,mNV},thunkAPI) =>{
    console.log({active:active,mNV:mNV});
    const response = await nhanVienService.setAciveStaff({active:active,mNV:mNV});
    thunkAPI.dispatch(getALlNhanVIen());
    return response
});
export const addNhanVien = createAsyncThunk("nhanvien/addNhanvien",async (Entity,thunkAPI) =>{
    const response = await nhanVienService.addNhanVien(Entity,);
    thunkAPI.dispatch(getALlNhanVIen())
    return response;
})
const listNhanVienSlide = createSlice({
    name: 'nhanvien',
    initialState : initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(getALlNhanVIen.pending,(state,action)=>{
            state.loading = true;
            state.entities = [];
        })
        .addCase(getALlNhanVIen.fulfilled,(state,action)=>{
            state.loading = false;
            state.entities = action.payload;
            sessionStorage.setItem("nhanvien",JSON.stringify(state));
        })
        .addCase(getALlNhanVIen.rejected,(state,action)=>{
            state.loading = false;
            state.entities = [];
        })
        .addCase(getNhanVIenById.pending,(state,action)=>{
            state.loading = true;
            state.entitie = {};
        })
        .addCase(getNhanVIenById.fulfilled,(state,action)=>{
            state.loading = false;
            state.entitie = action.payload;
            sessionStorage.setItem("nhanvien",JSON.stringify(state));
        })
        .addCase(getNhanVIenById.rejected,(state,action)=>{
            state.loading = false;
            state.entitie = {};
        })
        .addCase(uploadAvatar.fulfilled,(state,action)=>{
            state.message = "Upload avatar thành công";
        })
        .addCase(uploadAvatar.rejected,(state,action)=>{
            state.message = "Upload avatar thất bại";
        })
        .addCase(addNhanVien.fulfilled,(state,action)=>{
            state.message = action.payload.data.message;
        })
        .addCase(setActiveStaff.fulfilled,(state,action)=>{
            state.entitie = {};
        })
    }
})

export const  action = listNhanVienSlide.actions;
export default listNhanVienSlide.reducer
