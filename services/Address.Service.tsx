import Instance from "../src/helpers/ConnectAPI.axios";

export async function getAddress(id: string) {
    try {
      const response = await Instance.get(`Address/GetAddress?id=${id}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  export async function getAddressDetail(id: number) {
    try {
      const response = await Instance.get(`Address/GetAddressDetail/${id}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  export async function createAddress(values: any) {
    try {
      const response = await Instance.post(`Address/CreateAddress` , values);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  export async function updateAddress(values: any) {
    try {
      const response = await Instance.put(`Address/UpdateAddress` , values);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  export async function deleteAddress(id: number) {
    try {
      const response = await Instance.delete(`Address/DeleteAddress/${id}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  