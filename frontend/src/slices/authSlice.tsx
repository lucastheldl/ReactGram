import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user") || '{}');

const initialState ={
  user:user?user:null, 
  error:false,
  success:false,
  loading:false,
}

//Register an user and sign ir
export const register = createAsyncThunk("auth/register",async(user,thunkAPI) =>{
  //user = objeto passado pelo form
  const data:any = await authService.register(user);

  //check for errors
  if(data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0])
  }

  return data;
})