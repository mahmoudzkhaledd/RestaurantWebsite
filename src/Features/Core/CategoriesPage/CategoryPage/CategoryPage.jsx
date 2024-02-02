import CustomHeader from "@/GeneralComponents/LandingHeader/CustomHeader";
import { configs } from "../../CoreTexts";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { userAxios } from "@/Utils/UserAxios";
import MealCard from "@/GeneralComponents/ServiceCard/ServiceCard";

export default function CategoryPage({ }) {
    const param = useParams()
    const { isLoading, error, data, refetch } = useQuery(
        "get-all-categories-user",
        () => userAxios.get(`/meals?categories=${param.id},`),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    return (
        <section>
            <CustomHeader
                data={configs.allCategoriesPage}
                image={`https://r4.wallpaperflare.com/wallpaper/837/898/423/food-fruit-healthy-acorn-wallpaper-d950d8edb10a9d9bd657185f60b1c60d.jpg`}
            />
            <div className="col-span-3 flex flex-row flex-wrap justify-center gap-4 ">
                {
                    data?.data?.meals?.map((e, idx) =>
                        <MealCard className={''} key={idx} meal={e} />)
                }
            </div>
        </section>
    )
}
