import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {getAllKhuVuc}  from "./serviceKhuVuc"
let session = JSON.parse(sessionStorage.getItem('khuVuc'));
let initialState = session ? session : {
    entities: [],
    entitie: {},
    loading: false,
    message : ""
};

export const getKhuVuc  =createAsyncThunk("khuvuc/getAllKhuVuc",async ()=>{
    try {
        const data=  await getAllKhuVuc();
        return data.data
    } catch (error) {
        console.log("get all nhan vien falild: ",error);
    }
})

const KhuVucSlide = createSlice({
    name:"khuVucSlide",
    initialState : initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getKhuVuc.pending , (state,action)=>{
            state.loading = true,
            state.entities = [],
            state.entitie = {}
        })
        .addCase(getKhuVuc.fulfilled , (state,action)=>{
            state.entities = action.payload,
            state.loading = false,
            state.entitie = {}
        })
        .addCase(getKhuVuc.rejected , (state,action)=>{
            state.loading = false,
            state.entities = [],
            state.entitie = {}
        })
    }
})
export const action = KhuVucSlide.actions
export default KhuVucSlide.reducer