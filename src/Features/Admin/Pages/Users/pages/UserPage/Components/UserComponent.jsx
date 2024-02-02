import UserAddressComponent from "@/GeneralComponents/UserAddress/UserAddressComponent";
import { Link } from "react-router-dom";




export default function AdminUserAddressComponent({ addresses, user }) {

    if (addresses == null) {
        return <></>;
    }
    return (
        <div aria-label="card" className="p-8 rounded-lg  bg-[color:var(--secondary)]  h-fit w-full">
            <div aria-label="header" className="flex items-center mb-5">
                <div className="flex items-center justify-center rounded-full w-10 h-10 ml-4 bg-[color:var(--secondary-select)]">
                    <i className="fa-solid fa-location-dot" />
                </div>
                <div className="space-y-0.5 flex-1">
                    <h3 className="font-medium text-lg tracking-tight  leading-tight">
                        عناوين المستخدم
                    </h3>

                </div>
                {user && <Link
                    to={`/admin/users/${user._id}`}
                    className="inline-flex items-center bg-[color:var(--primary-select)] shrink-0 justify-center w-8 h-8 rounded-full  focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 7l-10 10" />
                        <path d="M8 7l9 0l0 9" />
                    </svg>
                </Link>}
            </div>
            <hr className="my-4" />
            {
                user && <>
                    <div className="p-4 mb-4 rounded-md mt-3 bg-[color:var(--secondary-select)] w-full">
                        المستخدم: {user.name}
                    </div>
                    
                </>
            }
            <div aria-label="content" className=" grid gap-3">
                {
                    addresses.map((e, idx) => <UserAddressComponent address={e} key={idx} />)
                }
            </div>
        </div>

    )
}
