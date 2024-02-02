import Button from "@/GeneralElements/Button/Button";
import ComboBox from "@/GeneralElements/ComboBox/ComboBox";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import userModel from "@/Models/UserModel";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const genders = [{ text: "ذكر", value: true, }, { text: "انثى", value: false, }];
export default function RegisterPage({ }) {
    const [gender, setGender] = useState(genders[0]);
    const [loading, setLoading] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();

    const onSelect = (e) => {
        setGender(e);
    };
    const register = async (e) => {

        const obj = Object.fromEntries(new FormData(document.getElementById("from-register")).entries());
        if (obj.password != obj.confirmPassword && obj.password != "" && obj.confirmPassword != "") {
            toast.error("يرجى كتابة تأكيد الباسورد");
        }
        obj.gender = gender.value;
        setLoading(true);
        try {
            const data = await userModel.parseAsync(obj);
            const res = await userAxios.post('signup', data);
            const user = await userModel.parseAsync(res.data.user);
            disp(setUser(user));
            nav('/verify-email');
            setLoading(false);
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
            setLoading(false);
        }

    }
    return (
        <section >
            <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-[color:var(--secondary)] rounded-lg   md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            إنشاء حساب
                        </h1>
                        <form id="from-register" className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => e.preventDefault()}>
                            <TextBox disabled={loading} label="الاسم" placeholder="الإسم" name="name" />
                            <TextBox disabled={loading} label="الايميل" placeholder="ex@domain.com" name="email" type="email" />
                            <TextBox disabled={loading} label="الباسورد" placeholder="••••••••" name="password" type="password" />
                            <TextBox disabled={loading} label="تأكيد الباسورد" placeholder="••••••••" name="confirmPassword" type="password" />
                            <TextBox disabled={loading} label="الهاتف" placeholder="0xx23456789" name="phone" />
                            <ComboBox text="الجنس" items={genders} selected={gender} onSelect={onSelect} />
                            <Button className=" w-full" loading={loading} disabled={loading} onClick={register} >
                                إنشاء الحساب
                            </Button>
                            <p className="text-sm font-light text-gray-500 ">
                                لديك حساب بالفعل؟{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline "
                                >
                                    تسجيل الدخول
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
