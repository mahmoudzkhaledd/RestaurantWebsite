import { Link } from "react-router-dom";

export default function Logo({className = "",link = "/"}) {
    

    return (
        <Link to={link || "/"} className={`text-xl select-none `}>
            <span className={className}>
                برجر <span className=' text-[color:var(--primary)]'>بلس</span>
            </span>
        </Link>
    )
}
