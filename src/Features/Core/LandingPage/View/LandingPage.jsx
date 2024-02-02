import { userAxios } from "@/Utils/UserAxios";
import About from "../Components/About/About";
import Categories from "../Components/Categories/Categories";
import Discounts from "../Components/Discounts/Discounts";
import Hero from "../Components/Hero/Hero";
import Menu from "../Components/Menu/Menu";
import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";

export default function LandingPage({ }) {
    const { isLoading, error, data, refetch } = useQuery(
        "get-meals-client",
        () => userAxios.get('/configs/landing-page-items'),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );
    return (
        <main className=" space-y-[50px]">
            <Hero className=' mt-6' />

            {
                isLoading ? <Spinner className=" text-[35px] mt-6" /> :
                    <Categories categories={data?.data?.categories} className='mt-4' />
            }
            {/* <Discounts className='mt-6' /> */}
            {
                isLoading ? <Spinner className=" text-[35px] mt-6" /> :
                    <Menu mealsItems={data?.data?.meals || []} className="mt-6" />
            }
            <About className='mt-6' />

        </main>
    )
}
