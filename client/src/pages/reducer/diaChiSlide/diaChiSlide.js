import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getDiaChi} from "./serverDiaChi"
let initialState = {
    entities: [],
    entitie: {},
    loading: false,
    message : ""
}
export const getDiaChis = createAsyncThunk("diaChi/getDiaChi",async ()=>{
    try {
        const diachis = await getDiaChi();
        return  diachis.data;
    } catch (error) {
        console.log(error);
    }
})
const DiaChiSlide = createSlice({
    name : "diaChiSlide",
    initialState : initialState,
    reducers :{},
    extraReducers : (builder) =>{
        builder
        .addCase(getDiaChis.fulfilled, (state,action)=>{
            const diachis = action.payload;
            state.entities =diachis
            state.message = "get địa chỉ thành công"
        })
    }
})

export const action = DiaChiSlide.actions

export default DiaChiSlide.reducer