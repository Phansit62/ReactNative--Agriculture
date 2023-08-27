import Instance from "../src/helpers/ConnectAPI.axios";

export async function getProducts(pagesize:number ,currentpage:number , search:string) {
    try {
      const response = await Instance.get(`Products/GetProducts?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  