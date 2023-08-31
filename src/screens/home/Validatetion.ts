import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchData } from "../../authentication/authSlice";
const user = useSelector(fetchData);
export const Validation = yup.object().shape({
    telephone:yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
    points:yup.number().max(user.point,"แต้มของคุณมีไม่ถึง" ).required("กรุณากรอกแต๋มของคุณ"),
})
