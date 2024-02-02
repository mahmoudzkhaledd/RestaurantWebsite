import PriceComponent from "@/GeneralComponents/PriceComponent/PriceComponent";
import { Link } from "react-router-dom";

export default function MenuItem({ meal }) {
    meal = meal || {};

    return (
        <li className="group bg-[color:var(--secondary)] rounded-lg pb-4">
            <Link to={`/meals/${meal._id}`}>
                <div className="h-fit  overflow-hidden mb-4 grid bg-[color:var(--secondary)] place-items-center rounded-b-none rounded-lg group-hover:bg-[color:var(--primary)] ease-linear duration-200 ">
                    <img
                        src={meal.thumbnailUrl?.url || "/images/food.png"}
                        alt="food image"
                        className="h-[200px] w-full group-hover:scale-110 object-cover overflow-hidden grid place-items-center rounded-b-none rounded-lg ease-linear duration-200 "
                    />
                </div>
                <div className="px-5 flex flex-col justify-end ">
                    <div className="h-fit">
                        <h5 className=" text-center"> {meal.name}</h5>
                        <p className="text-fade text-center break-words">
                            {meal.subDescription}
                        </p>
                    </div>
                    <PriceComponent className="text-[color:var(--primary)]" priceObj={meal.price} />

                </div>
            </Link>
        </li>

    )
}
