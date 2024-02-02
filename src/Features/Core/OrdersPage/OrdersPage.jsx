import { useQuery } from "react-query";
import OrderCard from "./Components/OrderCard/OrderCard";
import { userAxios } from "@/Utils/UserAxios";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Pagination from "@/GeneralComponents/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { webConfig } from "@/Utils/WebConfigs";

export default function OrdersPage({ }) {
    const [page, setPage] = useState(1);
    const { isLoading, error, data } = useQuery(
        ['get-my-orders', page],
        () => userAxios.get(`/orders?page=${page - 1 < 0 ? 0 : page - 1}`),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    )

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.orders == null) {
        return <SorryDiv message="لا يمكن العثور على البيانات الرجاء المحاولة مرة اخرى" />
    }


    return (
        <div className="flex flex-col gap-5">
            {
                data.data.orders.length != 0 ? data.data.orders.map((e, idx) => <OrderCard key={idx} order={e} />)
                    : <SorryDiv message="لم يتم طلب أي وجبة بعد" />
            }
            <Pagination
                count={Math.ceil(data.data.count / webConfig.maxItemsPerPage)} current={page} onChangePage={(e) => setPage(e)} />
        </div>
    );

}
