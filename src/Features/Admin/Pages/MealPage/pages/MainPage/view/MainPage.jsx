
import SearchBar from "../Components/SearchBar";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import Pagination from "@/GeneralComponents/Pagination/Pagination";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";
import { webConfig } from "@/Utils/WebConfigs";
import GuideComponent from "@/GeneralComponents/GuideComponent";
import { adminConfig } from "@/Features/Admin/AdminConfig";
const header = [
    {
        title: "كود الوجبة",
        ref: ['_id'],
        link: "",
    },
    {
        title: "الاسم",
        ref: ['name'],
        link: "",
    },
    {
        title: "الحالة",
        ref: ['available'],
        link: "",
        boolTrue: "متاحة",
        boolFalse: "غير متاحة",
    },

    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,
    },
    {
        title: "عرض",
        ref: [''],
        link: "/admin/meals/",
        linkRef: "_id"
    },
]
export default function MealsMainPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
        state: "all",
    });

    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const state = searchParams.get('state');

    const { isLoading, isError, data } = useQuery(
        ['get-meals-admin', page, search, state],
        () => adminAxios.get(`meals?page=${Number(page) - 1 || 0}&search=${search || ""}&state=${state || "all"}`),
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
    if (isError || data.data.meals == null) {
        return <SorryDiv message="حدث خطأ الرجاء المحاولة مرة اخرى " />
    }
    return (

        <>
            <h5 className=" mb-5">المستخدمين</h5>
            <SearchBar selectedState={state} onSearch={onSearch} value={search || ""} />
            <div className="flex  flex-col lg:flex-row gap-5">
                <DataTable className="flex-[3]" header={header} data={data.data.meals} />
                <GuideComponent className="flex-[1]" guide={adminConfig.guides.mealsPage}/>
            </div>
            <br />
            <Pagination onChangePage={onChangePage}
                count={Math.ceil((data.data.count || 0) / webConfig.maxItemsPerPage)} current={Number(page) || 1} />
        </>
    )
}
