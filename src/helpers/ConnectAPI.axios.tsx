import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const baseURL = " https://f675-171-5-247-92.ngrok-free.app/";


async function getToken() {
  const data = await AsyncStorage.getItem("@data");
  const jsonConvert = data !== null ?  JSON.parse(data || "").token : "";
  console.log(jsonConvert);
  return jsonConvert
}

const instance =  axios.create( {
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": ["application/json;multipart/form-data;"],
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;