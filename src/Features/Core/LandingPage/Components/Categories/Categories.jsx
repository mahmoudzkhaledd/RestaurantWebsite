import { Link } from "react-router-dom";
import CategoryComp from "./CategoryComp";

export default function Categories({ className = "", categories = [] }) {


    return (
        <section id="category" className={className}>
            <div className=" flex justify-between items-center">
                <h4 className="mb-5 ">
                    تصفح الأصناف الخاصة بالمطعم
                </h4>
                <Link to={`/categories`} className="text-[color:var(--primary)] underline">
                    كل التصنيفات
                </Link>
            </div>
            <div className="w-full grid grid-cols-1 mx-auto  md:m-0 md:grid-cols-2 lg:grid-cols-3 gap-8  justify-center lg:flex-row lg:justify-start items-center">
                {
                    categories.map((e, idx) =>
                        <CategoryComp
                            key={idx}
                            id={e._id}
                            diagonalColor="#bb6b0b"
                            title={e.name}
                            image={e.image?.url || '/images/category.png'}
                            description={e.description}
                            btn="تصفح الان" />)
                }

            </div>
        </section>
    )
}
