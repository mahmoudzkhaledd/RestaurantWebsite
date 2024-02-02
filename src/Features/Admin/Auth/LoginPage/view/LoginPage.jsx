import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import adminModel from "@/Models/AdminModel";
import { adminAxios } from "@/Utils/AdminAxios";
import { setAdmin } from "@/hooks/AdminRedux/AdminModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage({ }) {
    const nav = useNavigate();
    const disp = useDispatch();
    const [loading, setLoading] = useState(false);
    const login = async (e) => {
        e.preventDefault();
        const { username, password, pinNumber } = Object.fromEntries(new FormData(document.getElementById('frm-login')).entries());
        setLoading(true);
        try {
            const res = await adminAxios.post('login', {
                username,
                password,
                pinNumber,
            });
            const data = await adminModel.safeParseAsync(res.data.admin);

            if (res.status == 200 && data.success) {
                disp(setAdmin(data.data));
                nav('/admin');
            } else {
                throw new Error("خطأ في البيانات");
            }
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            const res = ex.response;
            if (res == null) return;
            // if (res.status == 401) {
            //     toast.error("الرجاء التحقق من الايميل او الباسورد");
            // }else if(res.status == 402){
            //     toast.error("لقد تم ايقاف حسابك الرجاء التواصل مع صاحب الموقع");
            // }else{
            //     toast.error(ex.message);
            // }
        }
    }

    return (
        <section >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-[color:var(--secondary)] rounded-lg   md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 mb-4 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold text-[color:var(--text)]">
                            تسجيل الدخول لوحة التحكم
                        </h2>
                        <form id="frm-login" onSubmit={login} className=" space-y-4 md:space-y-6 flex flex-col "  >
                            <TextBox dir="ltr" disabled={loading} name="username" placeholder="اسم المستخدم" label="اسم المستخدم" />
                            <TextBox dir="ltr" disabled={loading} name="password" type="password" placeholder="كلمة المرور" label="كلمة المرور" />
                            <TextBox dir="ltr" disabled={loading} name="pinNumber" placeholder="رمز الحماية" label="رمز الحماية" />
                            <Button loading={loading} disabled={loading}>
                                تسجيل الدخول
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
