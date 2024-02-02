import CustomHeader from "@/GeneralComponents/LandingHeader/CustomHeader";
import { configs } from "../../CoreTexts";
import { useQuery } from "react-query";
import { userAxios } from "@/Utils/UserAxios";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import CategoryComponent from "./Components/CategoryComponent";

export default function AllCategoriesPage({ }) {
    const { isLoading, error, data, refetch } = useQuery(
        "get-all-categories-user",
        () => userAxios.get('/categories'),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    return (
        <section >
            <CustomHeader
                data={configs.allCategoriesPage}
                image={`https://r4.wallpaperflare.com/wallpaper/837/898/423/food-fruit-healthy-acorn-wallpaper-d950d8edb10a9d9bd657185f60b1c60d.jpg`}
            />
            {
                isLoading && <Spinner />
            }
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">


                {
                    (!isLoading && data?.data?.categories) &&
                    data?.data?.categories.map((e, idx) => <CategoryComponent key={idx} category={e}/>)
                }
            </div>
        </section>
    )
}
