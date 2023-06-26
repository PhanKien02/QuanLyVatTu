import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import nhanVienService  from "../nhanVienSlide/serverNhanVien"

const initialState = {
    entities: [],
    entitie: {},
    loading: false,
    message : "",
}
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
    }
})

export const  action = listNhanVienSlide.actions;
export default listNhanVienSlide.reducer
