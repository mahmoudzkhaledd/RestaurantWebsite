import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { adminAxios } from "@/Utils/AdminAxios";
import { webConfig } from "@/Utils/WebConfigs";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
const shcema = z.object({
    status: z.enum([...webConfig.orderStages.map(e => e.state), 'refused'],),
    refuseReason: z.string().max(1000, { message: "يجب الا تزيد الرسالة عن 1000 حرف" }).optional(),
});
export default function OrderStatus({ order, refetch }) {
    const [loading, setLoading] = useState(null);

    const changeOrderState = async () => {
        const { status, refuseReason } = Object.fromEntries(new FormData(document.getElementById('frm-change-state')).entries());
        setLoading('state');
        try {
            const data = await shcema.parse({ status, refuseReason });

            const res = await adminAxios.post(`orders/${order._id}/change-state`, data);
            refetch();
            toast("تم تغيير الحالة بنجاح");
        } catch (ex) {

            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0])
            } else if (ex.response != null && ex.response.data.errors != null && ex.response.data.errors.length != 0) {
                toast.error(ex.response.data.errors[0].msg);
            }
            else {
                toast.error(ex.message);
            }
        }
        setLoading(null);
    }

    return (
        <form id="frm-change-state" onSubmit={(e) => e.preventDefault()} className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold">حالة الطلب</h3>
            <div >
                <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-fade "
                >
                    تغيير حالة الطلب
                </label>
                <select
                    id="status"
                    name="status"
                    defaultValue={order.status}
                    disabled={loading}
                    className="px-3 border  border-gray-300 text-[color:var(--text-invert)] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                    {
                        webConfig.orderStages.map((e, idx) => <option key={idx} value={e.state} >{e.name}</option>)
                    }
                    <option value={"refused"} >تم الرفض</option>
                </select>
            </div>

            <TextBox disabled={loading} name="refuseReason" initialValue={order.refuseReason} area={true} label="سبب الرفض (ان تم الرفض)" placeholder="سبب الرفض" />
            <Button disabled={loading != null} loading={loading == 'state'} onClick={changeOrderState}  >
                تغيير الحالة
            </Button>
        </form>
    )
}
