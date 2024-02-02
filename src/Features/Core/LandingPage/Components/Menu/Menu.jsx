
import MenuItem from "./MenuItem";
export default function Menu({ className = "", mealsItems = [] }) {

    

    return (
        <section id="menu" className={`${className} `}>
            <div className="mx-auto text-center">
                <h4 >أفضل الأطعمة</h4>
                <div className="separator mx-auto" />
                <p className="text-fade">
                    استمتع بأفضل قائمة لدينا، حيث يلتقي الطعام اللذيذ بالتنوع والجودة لتجربة لا تُنسى!
                </p>
                {/* <div className="text-[color:var(--text)]">
                    <ul className="list-none flex flex-wrap justify-center gap-3 py-10">
                        {
                            Object.values(categories).map((e, idx) => <li
                                key={idx}
                                onClick={() => setMeals([...e.meals])}
                                data-tabs="all"
                                className="select-none cursor-pointer ease-linear duration-200  px-6  py-2 bg-[color:var(--secondary)] rounded-md hover:bg-[color:var(--primary)]"
                            >
                                {e.category.name}
                            </li>)
                        }

                    </ul>
                </div> */}
            </div>
            <div className="container mt-6">
                <div >
                    <ul className="list-none grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 ">
                        {
                            mealsItems.map((e, idx) => <MenuItem key={idx} meal={e} />)
                        }
                    </ul>
                    {
                        mealsItems.length == 0 && <div className="w-full flex flex-col gap-4 items-center justify-center">
                            <img className=" max-w-[300px] " src="/images/intermittent.png" />
                            <h5 className=" text-2xl font-bold">لم يتم إضافة وجبات بعد</h5>
                        </div>
                    }
                </div>

            </div>
        </section>
    )
}
