import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import userModel from "@/Models/UserModel";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage({ }) {

    const [loading, setLoading] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();
    const login = async () => {
        const { email, password } = Object.fromEntries(new FormData(document.getElementById("frm-login")).entries());

        if (!email || !password || email == "" || password == "") {
            toast.error("من فضلك ادخل كل البيانات المطلوبة");
            return;
        }
        setLoading(true);
        try {
            const res = await userAxios.post('login', { email, password });
            const user = await userModel.parseAsync(res.data.user);
            disp(setUser(user));
            if (user.banned) {
                nav(0)
                return;
            }
            if (!user.verifiedEmail) {
                nav('/verify-email');
            } else {
                nav('/');
            }
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
        setLoading(false);
    };

    return (
        <section >
            <div className="flex flex-col items-center justify-center  py-8 mx-auto my-auto md:h-screen ">
                <div className="w-full p-5  bg-[color:var(--secondary)] rounded-lg   md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                            تسجيل الدخول
                        </h1>
                        <form id="frm-login" className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => e.preventDefault()}>
                            <TextBox name="email" disabled={loading} placeholder="الايميل" label="الايميل" />
                            <TextBox name="password" disabled={loading} placeholder="الباسورد" label="الباسورد" type="password" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500  mr-1"
                                        >
                                            {" "}  تذكرني
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline "
                                >
                                    نسيت كلمة المرور؟
                                </a>
                            </div>
                            <Button className="w-full" disabled={loading} loading={loading} onClick={login} >
                                تسجيل الدخول
                            </Button>
                            <p className="text-sm font-light text-gray-500 ">
                                ليس لديك حساب؟{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-primary-600 hover:underline "
                                >
                                    إنشاء حساب
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}
