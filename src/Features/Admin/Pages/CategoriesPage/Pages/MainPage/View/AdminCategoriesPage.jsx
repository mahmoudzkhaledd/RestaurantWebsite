import Pagination from "../../../../../../../GeneralComponents/Pagination/Pagination";
import SearchBar from "../Components/SearchBar";

import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";
import { webConfig } from "@/Utils/WebConfigs";
import GuideComponent from "@/GeneralComponents/GuideComponent";
import { adminConfig } from "@/Features/Admin/AdminConfig";
const header = [
    {
        title: "رقم التصنيف",
        ref: ['_id'],
        link: "",
    },
    {
        title: "الاسم",
        ref: ['name'],
        link: "",
        replacement: "غير موجودة",
    },

    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,


    },
    {
        title: "عرض",
        ref: [''],
        link: "/admin/categories/",
        linkRef: "_id"
    },
]
export default function AdminCategoriesPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",

    });

    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const responsable = searchParams.get('responsable');

    const { isLoading, isError, data, refetch } = useQuery(
        ['get-categories', page, search, responsable],
        () => adminAxios.get(`categories?page=${Number(page) - 1 || 0}&search=${search || ""}&responsable=${responsable}`),
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

        });
    };
    const onSearch = (se) => {

        setSearch({
            page: 0,
            search: se.search || "",

        });
    };


    if (isLoading) {
        return <Spinner />;
    }
    if (isError || data.data.categories == null) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }

    return (
        <>
            <h5 className=" mb-5">التصنيفات</h5>
            <SearchBar responsable={responsable == 'true'} onSearch={onSearch} value={search || ""} />
            <div className="flex flex-col lg:flex-row gap-5">
                <DataTable className=" flex-[3]" header={header} data={data.data.categories} />
                <GuideComponent
                    className="flex-[1]"
                    guide={adminConfig.guides.categories} />
            </div>
            <br />
            <Pagination onChangePage={onChangePage} count={Math.ceil((data.data.count || 0) / webConfig.maxItemsPerPage)} current={Number(page) || 1} />
        </>
    )
}
