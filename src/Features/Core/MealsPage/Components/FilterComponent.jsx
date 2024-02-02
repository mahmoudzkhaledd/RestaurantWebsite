import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { getObjectWithArray } from "@/Utils/Helper";
import { useSearchParams } from "react-router-dom";

export default function FilterComponent({ className = "", loadig, categories, setCategories }) {
    const [searchParams, setSearch] = useSearchParams();
    const cats = {}
    const category = (searchParams.get('categories') == "" ? null : searchParams.get('categories')?.split(',')) || [];
    for (const cat of category) {
        cats[cat] = true;
    }
    const search = () => {
        const obj = Object.fromEntries(new FormData(document.getElementById("frm-cats")).entries())

        setCategories(getObjectWithArray(obj, 'categories').categories);
    };
    return (
        <div className={`${className} w-full h-fit bg-[color:var(--secondary)] p-4 rounded-md`}>
            <div className="flex  justify-between items-center">
                <h5 className="font-bold">التصنيفات</h5>
                <Button onClick={search} className=" bg-blue-500" color={false}>
                    ابحث
                </Button>
            </div>
            {
                loadig ? <Spinner /> :
                    <form onSubmit={(e) => e.preventDefault()} id="frm-cats" className=" space-y-3 mt-4">
                        {
                            categories?.map((e, idx) =>
                                <div key={idx} className="flex justify-between bg-[color:var(--secondary-select)] p-2 rounded-md">
                                    <div className="flex gap-2">
                                        <input defaultChecked={cats[e._id]} type="checkbox" defaultValue={e._id} id={e._id} name={`categories-${e._id}`} />
                                        <label htmlFor={e._id}>{e.name}</label>
                                    </div>
                                    <p className="py-1 px-2 bg-[color:var(--primary)] rounded-md">
                                        {e?.meals?.length} وجبة
                                    </p>
                                </div>)
                        }
                    </form>
            }
            {
                categories?.length == 0 && <p>
                    لا يوجد تصنيفات حتى الان
                </p>    
            }
        </div>
    )
}
