import { Link } from "react-router-dom";

export default function UserCart({ cart }) {

    return (
        <div className="gap-4 h-fit flex flex-col p-4 rounded-lg bg-[color:var(--secondary)]">
            <h4 className="mb-5 text-lg font-semibold">عربة التسوق الخاصة بالمستخدم</h4>
            {
                (cart && cart.length > 0) &&
                cart.map((e, idx) =>
                    e.mealId && <Link to={`/admin/meals/${e.mealId?._id}`} className="w-full flex justify-between items-center bg-[color:var(--secondary-select)] px-4 py-3 rounded-lg">
                        <p> {e.mealId?.name}</p>
                        <p className="text-center font-bold text-lg flex items-center justify-center rounded-full bg-[color:var(--primary)] aspect-square w-10"> {e.mealNumber}</p>

                    </Link>)
            }
            {
                cart.length ==0 && <div className=" text-center">
                    <p>لم يتم طلب أي وجبة بعد</p>
                </div>
            }
        </div>
    )
}
