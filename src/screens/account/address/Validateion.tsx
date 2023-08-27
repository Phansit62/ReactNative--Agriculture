import * as yup from "yup";

export const Validation = yup.object().shape({
    district: yup.number().min(1,"กรุณาเลือก อำเภอ").required("กรุณาเลือก อำเภอ"),
    subdistrict: yup.number().min(1,"กรุณาเลือก ตำบล").required("กรุณาเลือก ตำบล"),
    province: yup.number().min(1,"กรุณาเลือก จังหวัด").required("กรุณาเลือก จังหวัด"),
    name: yup.string().required("กรุณากรอก ชื่อที่อยู่"),
    addressAt: yup.string().required("กรุณากรอก ที่อยู่"),
    postcode: yup.string().required("กรุณากรอก รหัสไปรษณีย์"),
})