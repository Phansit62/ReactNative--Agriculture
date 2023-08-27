import Instance from "../src/helpers/ConnectAPI.axios";

export async function dashboardMobile(type: number, year: number) {
  try {
    const response = await Instance.get(`Reports/DashboardMobile?type=${type}&year=${year}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function reportIncome( year: number,month:number) {
  try {
    const response = await Instance.get(`Reports/ReportIncome?year=${year}&month=${month}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
