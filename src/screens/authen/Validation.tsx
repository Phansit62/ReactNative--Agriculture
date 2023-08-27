import * as yup from "yup";

export const Validation = yup.object().shape({
    prefix: yup.number().min(1,"กรุณาเลือก คำนำหน้าชื่อ").required("กรุณาเลือก คำนำหน้าชื่อ"),
    firstname: yup.string().required("กรุณากรอก ชื่อ"),
    lastname: yup.string().required("กรุณากรอก นามสกุล"),
    email: yup.string().required("กรุณากรอก อีเมล"),
    phone: yup
      .string()
      .required("กรุณากรอก เบอร์โทรศัพท์")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "หมายเลขโทรศัพท์ไม่ถูกต้อง"
      )
      .min(10, "เบอร์โทรศัพท์ 10 หลัก")
      .max(10, "เบอร์โทรศัพท์ 10 หลัก"),
    password: yup.string().required("กรุณากรอก รหัสผ่าน"),
    confirmPassword: yup
      .string()
      .required("ยืนยันรหัสผ่าน")
      .oneOf([yup.ref("password")], "รหัสผ่านต้องตรงกัน"),
})