import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
const schemaPassword = z.object({
    oldPassword: z.string()
        .min(8, { message: "يجب أن يكون الباسورد 8 حرف بحد ادنى" })
        .max(200, { message: "يجب أن يكون الباسورد 200 حرف بحد اقصى" }),
    newPassword: z.string()
        .min(8, { message: "يجب أن يكون الباسورد 8 حرف بحد ادنى" })
        .max(200, { message: "يجب أن يكون الباسورد 200 حرف بحد اقصى" }),
});
export default function AccountPassword({ }) {
    const [loading, setLoading] = useState(null);
    const user = userStore.getState().user.user;
    const resetPassword = async () => {
        const { oldPassword, newPassword, newPasswordConfirm } = Object.fromEntries(new FormData(document.getElementById("frm-reset-password")).entries());
        setLoading('pass');
        try {
            const data = await schemaPassword.parseAsync({ oldPassword, newPassword, newPasswordConfirm });
            if (data.newPassword != newPasswordConfirm) {
                throw new Error('كلمات المرور غير متطابقة');
            }
            const res = await userAxios.post('reset-password', data);
            toast("تم التغيير بنجاح");
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            } else {
                toast.error(ex.message);
            }
        }
        setLoading(null);
    };

    return (
        <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
            <h3 className="mb-4 text-xl font-bold">اعادة تعيين كلمة المرور</h3>
            <form id="frm-reset-password" action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <TextBox disabled={loading} name="oldPassword" placeholder="••••••••" label="الباسورد الحالي" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextBox disabled={loading} name="newPassword" placeholder="••••••••" label="الباسورد الجديد" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <TextBox disabled={loading} name="newPasswordConfirm" placeholder="••••••••" label="اعادة الباسورد الجديد" />
                    </div>

                    <div className="col-span-6 sm:col-full">
                        <Button disabled={loading != null} onClick={resetPassword} loading={loading == 'pass'} >
                            اعادة التعيين
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
