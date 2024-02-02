import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import userModel from "@/Models/UserModel";
import { userAxios } from "@/Utils/UserAxios";
import { logOutUser, setUser } from "@/hooks/UserRedux/UserModelSlice";
import { userStore } from "@/hooks/UserRedux/UserStore"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyEmailPage({ }) {
    const state = userStore.getState().user.user;
    const [loading, setLoading] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();
    const verifyEmail = async () => {
        const { code } = Object.fromEntries(new FormData(document.getElementById("frm-active")).entries());


        if (!code || code == "" || code.length != 6) {
            toast.error("الكود يجب ان يكون 6 احرف");
            return;
        }
        setLoading(true);
        try {
            const res = await userAxios.post('verify-account', { code });
            const user = await userModel.parseAsync(res.data.user);
            disp(setUser(user));
            nav('/', { replace: true });
            return;
        } catch (ex) {
            if (ex.response != null && ex.response.data.msg != null) {

                if (ex.response.status == 420) {
                    disp(logOutUser());
                    nav('/login');
                    return;
                }
            }

        }
        setLoading(false);
    };
    const resendEmail = async () => {
        try {
            const res = await userAxios.get('verify-account/resend');
            toast("تم الارسال بنجاح");
            return;
        } catch (ex) {

            toast.error(ex.message);

        }
    }
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            <div className="relative bg-[color:var(--secondary)] px-6 pt-10 pb-9  mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>تأكيد الحساب</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>
                                لقد قمنا بإرسال رمز إلى بريدك الإلكتروني {state?.email}.
                            </p>
                        </div>
                    </div>
                    <div>
                        <form id="frm-active" action="" method="post" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col space-y-10">
                                <TextBox disabled={loading} name="code" maxLength={6} placeholder="Code" width={"100%"} textAlign="center" letterSpacing={10} />
                                <div className="flex flex-col space-y-5">
                                    <Button disabled={loading} loading={loading} onClick={verifyEmail} width={"100%"} verticalPadding={10} >
                                        تفعيل الحساب
                                    </Button>
                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>
                                            لم تصلني الرسالة؟
                                        </p>

                                        <a
                                            className="flex flex-row items-center text-blue-600"
                                            onClick={resendEmail}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            إعادة الارسال
                                        </a>
                                    </div>
                                </div>
                                <div
                                    id="alert-2"
                                    className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-[color:var(--secondary-select)] "
                                    role="alert"
                                >
                                    <i className="fa-solid fa-circle-exclamation text-2xl"></i>
                                    <span className="sr-only">Info</span>
                                    <div className="ms-3 text-sm font-medium inline-block w-5/6">
                                        <h6 className=" mb-1 font-bold">لم تصلني الرسالة!</h6>

                                        <p className=" break-words">يرجى تفقد البريد المهمل لديك قبل اعادة ارسال ايميل جديد</p>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
