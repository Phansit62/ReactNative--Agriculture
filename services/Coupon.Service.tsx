import Instance from "../src/helpers/ConnectAPI.axios";

export async function getCouponList(pagesize = 5, currentpage = 1, search: string) {
  try {
    const response = await Instance.get(`Coupon/GetCouponList?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getHistoryCouponList(userId: string) {
  try {
    const response = await Instance.get(`users/GetHistoryCoupon/${userId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
