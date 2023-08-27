import * as yup from "yup";
export const Validation = yup.object().shape({
    telephone:yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
    points:yup.string().required("กรุณากรอกแต๋มของคุณ"),
})
