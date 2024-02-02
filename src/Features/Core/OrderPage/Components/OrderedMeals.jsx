
import { useState } from "react";
import OrderItem from "../../Checkout/Checkout/MealItem";

export default function OrderedMeals({ orders, total }) {
    const [isOpen, setOpen] = useState(false);


    return (
        <div className=" h-fit rounded-md bg-[color:var(--secondary)] p-5 px-6 space-y-4">
            <div className=" mb-4 flex items-center justify-between">
                <h6 className=" font-bold text-lg flex gap-3 items-center">
                    <p>الوجبات المطلوبة</p>
                    <p className=" rounded-md bg-[color:var(--primary)] px-3 py-1">{orders?.length} وجبة</p>
                </h6>
                
                <button
                    className=" text-lg w-[35px] h-[35px] text-black text-center bg-white rounded-full flex justify-center items-center"
                    onClick={() => setOpen(!isOpen)}>
                    <i className={`fa-solid ${isOpen ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                </button>
            </div>
            {
                isOpen && <div className="space-y-4 overflow-hidden">
                    {
                        orders?.map((e, idx) => <OrderItem order={e} key={idx} />)
                    }
                </div>
            }
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between items-center">
                <p className=" font-bold">المبلغ الذي سيتم دفعه</p>
                <p className=" font-bold">{total} جنيه</p>
            </div>
        </div>

    )
}
