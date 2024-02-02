import { Link } from "react-router-dom";

export default function DiscountComponent({ reverse = false }) {


    return (
        <div className={`bg-[var(--secondary)] flex flex-col p-5 rounded-lg md:${reverse ? "flex-row-reverse" : "flex-row"} md:items-center lg:${reverse ? "flex-row-reverse" : "flex-row"} lg:flex-1`}>
            <img
                src="https://static.vecteezy.com/system/resources/previews/022/598/687/original/tasty-beef-burger-png.png"
                alt="promo image"
                className="w-40 mx-auto hover:animate-movingY md:mx-5"
            />
            <div className="space-y-2 pt-5 md:pt-0 flex flex-col ">
                <h4 >احصل على خصم 10% في أسبوع الخصومات.</h4>
                <p className="text-fade">
                    استمتع بتخفيض 10% خلال أسبوع الرواتب الخاص بنا! احصل على أفضل الصفقات قبل انتهاء الفترة المحدودة.
                </p>
                <Link to="#" className="mt-6 ">
                    اشترك الان
                </Link>
            </div>
        </div>
    )
}
