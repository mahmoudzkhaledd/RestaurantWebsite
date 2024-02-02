
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";

import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
export default function WebsiteAvailability({ configs, refetch }) {

    const [loading, setLoading] = useState(null);
    const changeWebsiteAvailability = async (available) => {
        if (window.confirm(available == null ? "هل أنت متأكد من حفظ الرسالة؟" : "هل أنت متأكد من ايقاف الموقع؟")) {
            const message = document.getElementById('closed-message').value;
            setLoading(available == null ? 'save' : 'dis');
            try {
                const res = await adminAxios.post(`configs/change-available`, { message, available: available });
                refetch();

            } catch (ex) { }
            setLoading(null);
        }
    }
    return (
        <div className="w-100 p-6 bg-[color:var(--secondary)] border border-gray-200 rounded-lg shadow  ">
            <h5 className=" text-lg font-bold">
                ايقاف الموقع
            </h5>
            <br />
            <div className="flex flex-col gap-4">
                <TextBox id={'closed-message'} maxLength={100} disabled={loading} initialValue={configs?.closedMessage} className="w-100" placeholder="جاري عمل صيانة للموقع ..." label="الرسالة" />
                <div className="flex flex-row gap-2 mt-2 justify-between">
                    <Button loading={loading == 'save'} disabled={loading != null} onClick={() => changeWebsiteAvailability(null)} >حفظ</Button>
                    <Button loading={loading == 'dis'} disabled={loading != null} onClick={() => changeWebsiteAvailability(!configs.available)} >
                        {configs?.available ? "ايقاف" : "تفعيل"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
