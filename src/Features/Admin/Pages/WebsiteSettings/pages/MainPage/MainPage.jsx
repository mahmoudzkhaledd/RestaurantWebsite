import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";
import { useQuery } from "react-query";
import LandingPageMeals from "./Components/LandingPageMeals";
import LandingPageCategories from "./Components/LandingPageCategories";
import WebsiteAvailability from "./Components/WebsiteAvailability";
import GuideComponent from "@/GeneralComponents/GuideComponent";
import { adminConfig } from "@/Features/Admin/AdminConfig";

export default function WebsiteSettingsMainPage({ }) {
    const { isLoading, error, data, refetch } = useQuery(
        `web-configs-get`,
        () => adminAxios.get(`configs`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    const configs = data?.data?.configs;
    if (error || data == null || configs == null) {
        return <SorryDiv message="حدث خطأ الرجاء المحاولة في وقت لاحق" />
    }
    return (
        <div>
            <h5>اعدادات الموقع</h5>
            <br />
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex-[3] grid gap-4">
                    <div className="grid grid-2">
                        <LandingPageMeals className={'col-span-1'} refetch={refetch} meals={configs.landingPageMeals} />
                        <LandingPageCategories className={'col-span-1'} refetch={refetch} categories={configs.landingPageCategories} />
                    </div>
                    <WebsiteAvailability refetch={refetch} configs={configs} />
                </div>
                <GuideComponent className="flex-[1]" guide={adminConfig.guides.websiteSettings}/>
            </div>

        </div>
    )
}
