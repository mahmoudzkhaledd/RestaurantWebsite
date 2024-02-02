import CustomHeader from "@/GeneralComponents/LandingHeader/CustomHeader";
import Pagination from "@/GeneralComponents/Pagination/Pagination";

import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from "@/hooks/UserRedux/UserStore";

import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { configs } from "../../CoreTexts";
import MealCard from "@/GeneralComponents/ServiceCard/ServiceCard";
import FilterComponent from "../Components/FilterComponent";
import { useState } from "react";
import { webConfig } from "@/Utils/WebConfigs";

export default function MealsPage({ }) {
    const [searchParams, setSearch] = useSearchParams({
        page: 1,
        search: "",
        categories: "",
    });
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const categories = searchParams.get('categories');

    const { isLoading, error, data } = useQuery(
        ["get-all-meals", page, search, categories],
        () => userAxios.get(`meals?page=${Number(page) - 1 || 0}&search=${search || ""}&categories=${categories}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: loadingCats, error: catError, data: catData } = useQuery(
        ["get-all-categories"],
        () => userAxios.get(`categories`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        }
    );
    const onChangePage = (pge) => {
        setSearch({
            page: pge || 1,
            search: search || "",
            categories: cats.join(','),
        });
    };
    const setCategories = (cats) => {
        setSearch({
            page: 0,
            search: search || "",
            categories: cats.join(','),
        });
    };

    return (
        <section>

            <CustomHeader
                data={configs.mealsPage}
                image={"https://i.pinimg.com/originals/47/ca/69/47ca69b3785182417ece84cad9b93097.jpg"} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
                <div className="col-span-3 flex flex-row flex-wrap justify-center gap-4 ">
                    {
                        data?.data?.meals?.map((e, idx) =>
                            <MealCard key={idx} meal={e} />)
                    }
                </div>
                <FilterComponent setCategories={setCategories} loadig={loadingCats} categories={catData?.data?.categories} className="col-span-2" />
            </div>
            <Pagination onChangePage={onChangePage} className=" mt-10" current={Number(page) || 1}
                count={data != null ? Math.ceil(data.data.count / webConfig.maxItemsPerPage) || 0 : 0} />
        </section>
    )
}
