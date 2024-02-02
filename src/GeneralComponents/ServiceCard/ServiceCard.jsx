import Button from '@/GeneralElements/Button/Button';
import './style.css';
import { Link } from 'react-router-dom';
import PriceComponent from '../PriceComponent/PriceComponent';
export default function MealCard({ meal, className }) {
    return (

        <Link to={`/meals/${meal._id}`} style={{ maxWidth: "300px", }}
            className={`${className}  relative  overflow-hidden group bg-[color:var(--secondary)] border border-gray-200 rounded-lg`}>
            <div className={`  bg-[color:rgba(255,255,255,0.3)] transition-all flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100`}>
                <h5 className=' text-inherit font-bold'>اطلب الان</h5>
            </div>
            <img
                style={{
                    maxHeight: "100%",
                    aspectRatio: 16 / 9,
                    objectFit: "cover",
                }}
                className="rounded-t-lg "
                src={meal.thumbnailUrl?.url || "/images/food.png"} alt="" />
            <div className="p-5 ">
                <h6 className="mb-2 text-lg font-bold tracking-tight  ">
                    {meal.name}
                </h6>

                <p className="mb-3 font-normal break-words text-fade ">
                    {(meal.subDescription == null || meal.subDescription == "") ? "لا يوجد وصف مختصر للخدمة" : meal.subDescription}
                </p>
                <div className='flex justify-end'>
                    <PriceComponent className='mb-3 text-[color:var(--primary)]' priceObj={meal.price} />
                </div>


            </div>
        </Link>


    )

}
