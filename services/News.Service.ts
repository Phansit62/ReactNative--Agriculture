import Instance from "../src/helpers/ConnectAPI.axios";

export async function getNews() {
    try {
      const response = await Instance.get(`News/GetNewsList`);
      return await response.data;
    } catch (error) {
      console.log("error", error);
    }
  }