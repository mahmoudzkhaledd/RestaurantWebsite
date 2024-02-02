import Button from "@/GeneralElements/Button/Button";
import { adminAxios } from "@/Utils/AdminAxios";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderData({ order, total }) {
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    const deleteOrder = async () => {
        if (window.confirm("هل أنت متأكد من حذف الطلب؟") && order != null) {
            setLoading('del');
            try {
                const res = await adminAxios.delete(`orders/${order._id}/delete`);
                nav('/admin/orders');
            } catch (ex) {}
            setLoading(null);
        }
    };

    return (
        <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
            <div className="flex flex-row justify-between items-center">
                <h3 className="mb-4 text-xl font-bold">بيانات الطلب</h3>
                <Button className="w-[40px] h-[40px] rounded-full flex justify-center items-center" loading={loading == 'del'} disabled={loading != null} onClick={deleteOrder} >
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div>
                    <dt className="text-sm font-medium  mb-2">كود الطلب</dt>
                    <dd className="text-sm font-semibold text-fade">
                        {order._id}
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium  mb-2">رقم الطلب</dt>
                    <dd className="text-sm font-semibold text-fade">
                        {order.number}
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium  mb-2">المبلغ الذي سيدفع</dt>
                    <dd className="text-sm font-semibold text-fade">{total} جنيه</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium  mb-2">الحالة</dt>
                    <dd className="text-sm font-semibold text-fade">{order.status}</dd>
                </div>

                <div>
                    <dt className="text-sm font-medium  mb-2">تاريخ الإنشاء</dt>
                    <dd className="text-sm font-semibold text-fade">
                        {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium  mb-2">أخر تعديل</dt>
                    <dd className="text-sm font-semibold text-fade">
                        {moment(order.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </dd>
                </div>
            </dl>
        </div>
    )
}
