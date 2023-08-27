// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetail, login } from "../../services/User.Services";
import { RootState } from "../../stores/store";

// Async thunk action to handle the login process
export const onLogin = createAsyncThunk("auth/login", async (values: Loginstate) => {
  console.log("onLogin")
  try {
    const res = await login(values);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        AsyncStorage.setItem("@data", JSON.stringify(res.data));
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const onStorage = createAsyncThunk("auth/storage", async () => {
  console.log("onStorage")
  try {
    const data = await AsyncStorage.getItem("@data");
    let value = data !== null ? JSON.parse(data) : initialState;
    return value;
  } catch (e) {
    // error reading value
  }
});

export const onLogOut = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.clear();
  return false;
});

export const onReload = createAsyncThunk("auth/reload", async (userId: string) => {
  try {
    const res = await getUserDetail(userId);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

interface AuthState {
  id: string;
  email: string;
  prefix: string;
  firstname: string;
  lastname: string;
  imageProfile: string;
  phone: string;
  token: string;
  point: number;
  role:number;
  coupons:number[];
  isLogin: boolean;
}

interface Loginstate {
  emailOrPhone: string;
  password: string;
}

const initialState: AuthState = {
  id: "",
  email: "",
  prefix: "",
  firstname: "",
  lastname: "",
  imageProfile: "",
  phone: "",
  token: "",
  point: 0,
  role:0,
  coupons:[],
  isLogin: false,
};

const storeData = async (value: AuthState) => {
  try {
    if (value.id) {
      let data = JSON.stringify(value);
      await AsyncStorage.setItem("@data", data);
    }
  } catch (e) {
    // saving error
  }
};

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onLogin.fulfilled, (state, { payload }) => {
      if (payload) {
        state.id = payload.id;
        state.email = payload.email;
        state.prefix = payload.prefix;
        state.firstname = payload.firstname;
        state.lastname = payload.lastname;
        state.phone = payload.phone;
        state.imageProfile = payload.imageProfile;
        state.point = payload.points;
        state.token = payload.token;
        state.role = payload.role;
        state.coupons = payload.coupons;
        state.isLogin = payload.isLogin;
        storeData(state);
      }
    });
    builder.addCase(onReload.fulfilled, (state, { payload }) => {
      if (payload) {
        state.id = payload.id;
        state.email = payload.email;
        state.prefix = payload.prefix;
        state.firstname = payload.firstname;
        state.lastname = payload.lastname;
        state.phone = payload.phone;
        state.imageProfile = payload.imageProfile;
        state.point = payload.points;
        state.coupons = payload.coupons;
        storeData(state);
      }
    });
    builder.addCase(onStorage.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.prefix = payload.prefix;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.imageProfile = payload.imageProfile;
      state.phone = payload.phone;
      state.token = payload.token;
      state.point = payload.point;
      state.role = payload.role;
      state.coupons = payload.coupons;
      state.isLogin = payload.isLogin;
    });

    builder.addCase(onLogOut.fulfilled, (state) => {
      state.isLogin = false;
      state = initialState;
    });
  },
});

export const fetchData = (state: RootState) => state.auth;

export default authSlice.reducer;
