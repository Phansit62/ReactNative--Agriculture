import Instance from "../src/helpers/ConnectAPI.axios";

export async function register(values: any) {
  try {
    let data: any = new FormData();
    data.append("Prefix", values.prefix);
    data.append("Firstname", values.firstname);
    data.append("Lastname", values.lastname);
    data.append("Phone", values.phone);
    data.append("Email", values.email);
    data.append("Password", values.password);
    if (values.upload !== null) {
      const uriParts = values.upload.uri.split(".");
      const fileExtension = uriParts[uriParts.length - 1];

      const uriPartsFile = values.upload.uri.split("/");
      const filename = uriPartsFile[uriPartsFile.length - 1];

      data.append("upload", {
        uri: values.upload.uri,
        type: values.upload.type + "/" + fileExtension,
        name: `${filename}`,
      });
    }
    const response = await Instance.post(`Users/Register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function login(values: any) {
  try {
    const response = await Instance.post(`users/login`, values);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateUser(values: any) {
  try {
    let data: any = new FormData();
    data.append("Id", values.id);
    data.append("Prefix", values.prefix);
    data.append("Firstname", values.firstname);
    data.append("Lastname", values.lastname);
    data.append("Phone", values.phone);
    data.append("Email", values.email);
    if (values.upload !== null) {
      const uriParts = values.upload.uri.split(".");
      const fileExtension = uriParts[uriParts.length - 1];

      const uriPartsFile = values.upload.uri.split("/");
      const filename = uriPartsFile[uriPartsFile.length - 1];

      data.append("upload", {
        uri: values.upload.uri,
        type: values.upload.type + "/" + fileExtension,
        name: `${filename}`,
      });
    }
    const response = await Instance.post(`Users/UpdateUser`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getUserDetail(userId: string) {
  try {
    const response = await Instance.get(`users/GetUserDetail/${userId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
export async function getCouponUserList(userId: string) {
  try {
    const response = await Instance.get(`users/GetCouponUserList/${userId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
export async function getHistoryOrderList(userId: string) {
  try {
    const response = await Instance.get(`users/GetHistoryOrderList/${userId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function redeemCoupon(userId: string,couponId:number) {
  try {
    const response = await Instance.get(`users/RedeemCoupon?userId=${userId}&couponId=${couponId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

