import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import AdminUserAddressComponent from "../../../Users/pages/UserPage/Components/UserComponent";
import OrderData from "./Components/OrderData";
import OrderStatus from "./Components/OrderStatus";
import NeededMeals from "./Components/NeededMeals";


export default function AdminOrderPage({ }) {
    const searchParams = useParams();

    const { isLoading, error, data, refetch } = useQuery(
        `get-order-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`orders/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.order == null) {
        return <SorryDiv message="هذه الخدمة غير موجودة, الرجاء المحاولة مرة اخرى مع خدمة مختلفة" />
    }
    const order = data.data.order;
    return (
        <main>
            <div className="flex gap-5">
                <h5>طلب رقم {order.number}</h5>
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-full xl:col-auto">
                    
                    <br />
                    <NeededMeals refetch={refetch} orders={order.orders} />
                </div>
                <div className="col-span-2 space-y-5">
                    <OrderData order={order} total={data.data.total} />
                    <AdminUserAddressComponent user={order.userId} addresses={[order.address]} />
                    <OrderStatus refetch={refetch} order={order} />
                </div>
            </div>
        </main>
    )
}
