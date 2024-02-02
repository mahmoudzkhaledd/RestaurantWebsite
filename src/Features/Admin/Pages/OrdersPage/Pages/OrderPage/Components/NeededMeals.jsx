import OrderItem from "@/Features/Core/Checkout/Checkout/MealItem";
import Button from "@/GeneralElements/Button/Button";
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditOrderItemModal from "./EditOrderItemModal";

export default function NeededMeals({ orders, refetch }) {
    const [loading, setLoading] = useState(null);
    const params = useParams();
    const [itemEdit, setItemEdit] = useState(null);
    const editItem = async (item) => {
        setItemEdit(item);
    };
    const deleteOrderItem = async (id) => {
        if (!id || !params.id || !window.confirm("هل أنت متأكد من ازالة العنصر؟")) return;
        try {
            setLoading(`delete ${id}`);
            try {
                const res = await adminAxios.delete(`orders/${params.id}?removeMeal=${id}`);
                refetch();
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        } catch (ex) {

        }
    };

    return (
        <div className="space-y-4">
            {
                itemEdit != null && <EditOrderItemModal itemEdit={itemEdit} closeModal={() => setItemEdit(null)} />
            }
            <div className="flex mb-4 items-center justify-between">
                <h6 className=" font-bold  text-lg">الوجبات المطلوبة</h6>
                <Button onClick={()=> setItemEdit("")} className="">
                    إضافة
                </Button>
            </div>
            {
                orders.map((e, idx) =>
                    <OrderItem editItem={editItem} admin={true} disabled={loading} deleteCartItem={deleteOrderItem} order={e} key={idx} />)
            }
        </div>
    )
}
