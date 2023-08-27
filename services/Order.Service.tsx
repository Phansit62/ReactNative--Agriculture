import Instance from "../src/helpers/ConnectAPI.axios";

export async function createOrder(values: any) {
  try {
    let data: any = new FormData();
    data.append("userId", values.userId);
    data.append("addressId", values.addressId);
    data.append("paymentmethod", values.paymentmethod);
    data.append("couponId", values.couponId);
    data.append("totalprice", values.totalprice);
    if (values.products) {
      values.products.forEach((item: any, index: number) => {
        data.append(`Products[${index}].ProductId`, item.productId);
        data.append(`Products[${index}].Price`, item.price);
        data.append(`Products[${index}].Quantity`, item.quantity);
      });
    }
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
    const response = await Instance.post(`Orders/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getOrderDetail(orderId: number) {
  try {
    const response = await Instance.get(`Orders/GetOrderDetail/${orderId}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function changeStatus(id = 0, status = 0) {
  try {
    const response = await Instance.put(`Orders/ChangeStatus?id=${id}&status=${status}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}