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
export const uploadAvatar = createAsyncThunk("nhanvien/uploadAvatar",async({avatar,mNV})=>{

    try {
        const res=  await nhanVienService.uploadAvatar(avatar,mNV);
        return res;
    } catch (error) {
        console.log(error);
        return {
            message: "upload avatar thất bại"
        }
    }
})
const listNhanVienSlide = createSlice({
    name: 'nhanvien',
    initialState : initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(getALlNhanVIen.pending,(state,action)=>{
            state.loading = true
            state.entities = []
        })
        .addCase(getALlNhanVIen.fulfilled,(state,action)=>{
            state.loading = false
            state.entities = action.payload
            sessionStorage.setItem("nhanvien",JSON.stringify(state));
        })
        .addCase(getALlNhanVIen.rejected,(state,action)=>{
            state.loading = false
            state.entities = []
        })
        .addCase(getNhanVIenById.pending,(state,action)=>{
            state.loading = true
            state.entitie = {}
        })
        .addCase(getNhanVIenById.fulfilled,(state,action)=>{
            state.loading = false
            state.entitie = action.payload
        })
        .addCase(getNhanVIenById.rejected,(state,action)=>{
            state.loading = false
            state.entitie = {}
        })
        .addCase(uploadAvatar.fulfilled,(state,action)=>{
            state.message = "Upload data thành công"
        })
        .addCase(uploadAvatar.rejected,(state,action)=>{
            state.message = "Upload data thất bại"
        })
    }
})

export const  action = listNhanVienSlide.actions;
export default listNhanVienSlide.reducer
