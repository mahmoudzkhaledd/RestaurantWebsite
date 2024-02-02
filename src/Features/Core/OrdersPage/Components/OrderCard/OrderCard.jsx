import moment from "moment";
import { Link } from "react-router-dom";
import './style.css'
import { getOrderStatus } from "@/Utils/Helper";
export default function OrderCard({ order }) {
    return (
        <Link
            to={`/orders/${order._id}`}
            className="flex px-5 flex-col py-4 bg-[color:var(--secondary)] border border-gray-200 rounded-lg shadow hover:text-[color:var(--text)]  hover:bg-[var(--secondary-select)] "
        >

            <div className="flex flex-col justify-between px-4 leading-normal w-100">
                <h6 className="mb-3 text-lg font-bold">طلب رقم {order?.number}</h6>
               
                <p className="mb-1 text-fade ">
                   كود الطلب: {order._id}
                </p>
                <p className="mb-1 text-fade ">
                   الحالة: {getOrderStatus(order.status)}
                </p>
                <p className="mb-1 text-fade ">
                    {"تاريخ الانشاء: " + moment(order.createdAt, "").fromNow()}
                </p>
            </div>
        </Link>

    )
}
