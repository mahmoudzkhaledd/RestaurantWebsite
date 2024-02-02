import { Link } from "react-router-dom";

export default function MealCategories({ categories, link, title, className,  }) {
    if (categories == null) return <></>;

    return (
        <div className={`bg-[color:var(--secondary)] rounded-2xl p-4 mb-6 ${className}`}>
            <div className="flex flex-row justify-between items-center">
                <h3 className=" text-xl font-bold">{title}</h3>
            </div>
            <br />
            <div className="flex flex-wrap gap-3">
                {
                    categories.length == 0 && <p>لا يوجد تصنيفات للوجبة</p>
                }
                {
                    categories?.map((e, idx) =>
                        <Link to={link && `/admin/categories/${e._id}`} key={idx} className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-[color:var(--secondary-select)] py-1.5 px-3   font-bold  ">
                            <span className="">{e.name}</span>
                        </Link>)
                }
            </div>
        </div>

    )
}
