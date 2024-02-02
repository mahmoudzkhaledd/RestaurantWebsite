import Button from "@/GeneralElements/Button/Button"
import { Link } from "react-router-dom";

export default function OrderItem({ order, deleteCartItem, disabled, admin, editItem }) {

    if (order?.mealId == null) return <></>;
    const price = (order.price?.afterDiscount || 0) == 0 ? order.price?.price : order.price?.afterDiscount;
    return (
        <li className="flex border flex-col hover:bg-[color:var(--secondary-select)] transition-colors p-4 rounded-lg">
            <Link className="flex mb-3 gap-4" to={`${admin != null ? "/admin" : ""}/meals/${order.mealId?._id}`} target="_blank">

                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={order.mealId?.thumbnailUrl?.url || '/images/food.png'}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                    <p className="mb-2 font-bold">{order.mealId?.name}</p>
                    <p className="mb-2 text-fade">سعر الوجبة: {price} جنيه</p>
                    <p className="mb-2 text-fade">عدد: {order.mealNumber} {order.mealNumber == 1 ? "وجبة" : "وجبات"}</p>
                    <p className="mb-2 text-fade">الحجم: {order.size == "smallSize" ? "الحجم الصغير" : order.size == "mediumSize" ? "الحجم المتوسط" : "الحجم الكبير"}</p>

                </div>
            </Link>
            <div className="flex flex-1 items-end justify-between text-sm">
                <p className="mb-2 text-sm font-semibold">الإجمالي: {price * order.mealNumber} جنيه</p>
                <div className="flex items-center flex-wrap">
                    {
                        editItem && <Button
                            disabled={disabled}
                            color={false}
                            onClick={() => editItem(order)}
                            loading={disabled && disabled == `edit ${order._id}`}
                            className=" hover:bg-gray-300 font-medium"
                        >
                            تعديل
                        </Button>
                    }
                    {
                        deleteCartItem && <Button
                            disabled={disabled}
                            color={false}
                            onClick={() => deleteCartItem(order._id)}
                            loading={disabled && disabled == `delete ${order._id}`}
                            className=" hover:bg-red-500 font-medium"
                        >
                            إزالة
                        </Button>
                    }

                </div>
            </div>
        </li>
    )
}
