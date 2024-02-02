import { Link } from "react-router-dom";

export default function CategoryComponent({ category }) {

    if (!category) return <></>;
    return (
        <Link to={`/categories/${category._id}`} className=" bg-[color:var(--secondary)] border  rounded-lg p-5 shadow ">
            <img className="rounded-lg mb-4 w-full h-[200px] object-cover mx-auto" src={category?.image?.url || "/images/category.png"} alt="" />
            <div className=" text-center lg:text-start">
                <h5 className="mb-2 text-2xl font-bold tracking-tight  ">
                    {
                        category?.name
                    }
                </h5>
                <p className="mb-3 font-normal text-fade ">
                    {
                        category.description
                    }
                </p>

            </div>
        </Link>

    )
}
