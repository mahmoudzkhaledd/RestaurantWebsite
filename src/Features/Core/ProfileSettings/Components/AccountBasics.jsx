import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
const schema = z.object({
    phone: z.string().min(0).max(15, { message: "يجب أن يكون رقم الهاتف 15 حرف بحد اقصى" }),
});
export default function AccountBasics({ }) {
    const [loading, setLoading] = useState(null);
    const user = userStore.getState().user.user;
    const saveChanges = async () => {
        const { phone } = Object.fromEntries(new FormData(document.getElementById('frm-changes')).entries());
        setLoading('save');
        try {
            const data = await schema.parseAsync({ phone });
            const res = await userAxios.post('update-account', data);
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
        <div className="bg-[color:var(--secondary)] rounded-2xl p-4 mb-6">
            <h3 className="mb-4 text-xl font-bold">معلومات الحساب</h3>
            <form id="frm-changes" action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">

                    <div className="col-span-1 sm:col-span-3">
                        <TextBox disabled={loading} maxLength={15} initialValue={user?.phone} name="phone" placeholder="رقم الهاتف" label="رقم الهاتف" type="number" />
                    </div>
                    <div className="col-span-1 sm:col-full">
                        <Button loading={loading == 'save'} disabled={loading != null} onClick={saveChanges} >
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
