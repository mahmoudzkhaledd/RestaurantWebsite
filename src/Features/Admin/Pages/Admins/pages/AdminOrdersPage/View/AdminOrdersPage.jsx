import Pagination from "../../../../../../../GeneralComponents/Pagination/Pagination";

import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";

import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";
import { webConfig } from "@/Utils/WebConfigs";
const header = [
    {
        title: "رقم الطلب",
        ref: ['number'],
        link: "",
    },
    {
        title: "الخدمة",
        ref: ['MealId', 'name'],
        link: "",
        replacement: "غير موجودة",
    },
    {
        title: "الحالة",
        ref: ['status'],
        link: "",
    },
    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,


    },
    {
        title: "عرض",
        ref: [''],
        link: "/admin/orders/",
        linkRef: "_id"
    },
]
export default function AdminOrdersPage({ }) {
    const param = useParams();
    const [searchParams, setSearch] = useSearchParams({
        page: 0,
    });
    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
           
        });
    };
    const page = searchParams.get('page');
    const { isLoading, isError, data, refetch } = useQuery(
        ['get-orders-for-admin',page],
        () => adminAxios.get(`/admins/${param.id}/orders?page=${page}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 0,
            enabled: param.id != null,
        }
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }
    return (
        <>
            <h5 className=" mb-5">الطلبات الخاصة بالمدير</h5>
            <DataTable header={header} data={data.data.orders} />
            <br />
            <Pagination onChangePage={onChangePage} 
            count={Math.ceil((data.data.count || 0) / webConfig.maxItemsPerPage)} 
            current={Number(page) || 1} />
        </>
    )
}
