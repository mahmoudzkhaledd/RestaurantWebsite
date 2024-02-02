
import SearchBar from "../Components/SearchBar";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import Pagination from "@/GeneralComponents/Pagination/Pagination";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";
import { webConfig } from "@/Utils/WebConfigs";
const header = [
    {
        title: "رقم المستخدم",
        ref: ['number'],
        link: "",
    },
    {
        title: "الاسم",
        ref: ['name'],
        link: "",
    },
    {
        title: "الايميل",
        ref: ['email'],
        link: "",
    },
    {
        title: "الحالة",
        ref: ['banned'],
        link: "",
        boolTrue: "محظور",
        boolFalse: "غير محظور",
    },
    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,
    },
    {
        title: "عرض",
        ref: [''],
        link: "/admin/users/",
        linkRef: "_id"
    },
]
export default function UsersMainPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
        state: "all",
    });

    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const state = searchParams.get('state');

    const { isLoading, isError, data } = useQuery(
        ['get-users-admin', page, search, state],
        () => adminAxios.get(`users?page=${Number(page) - 1 || 0}&search=${search || ""}&state=${state || "all"}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 0,
        }
    );



    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
            search: search || "",
            state: state || 'all',
        });
    };
    const onSearch = (se) => {

        setSearch({
            page: 1,
            search: se.search || "",
            state: se.state || "all",
        });
    };


    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }
    return (

        <>
            <h5 className=" mb-5">المستخدمين</h5>
            <SearchBar selectedState={state} onSearch={onSearch} value={search || ""} />
            <DataTable header={header} data={data.data.users} />
            <br />
            <Pagination onChangePage={onChangePage} 
            count={Math.ceil((data.data.count || 0) / webConfig.maxItemsPerPage)} current={Number(page) || 1} />
        </>
    )
}
