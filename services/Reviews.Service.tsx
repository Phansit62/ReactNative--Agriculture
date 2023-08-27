import Instance from "../src/helpers/ConnectAPI.axios";

export async function getReviewsList(id: number) {
  try {
    const response = await Instance.get(`Reviews/GetReviewsList/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getReviewDetail(id: number) {
  try {
    const response = await Instance.get(`Reviews/GetReviewDetail/${id}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createReview(data:any) {
  try {
    const response = await Instance.post(`Reviews/CreateReview`,data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

