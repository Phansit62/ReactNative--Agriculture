import Instance from "../src/helpers/ConnectAPI.axios";

export async function getHistoryTransferList(userId: string) {
    try {
      const response = await Instance.get(`TransferPoints/GetTransferPointList/${userId}`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  export async function createTransfer(value:any) {
    try {
      const response = await Instance.post(`TransferPoints/Create`,value);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  