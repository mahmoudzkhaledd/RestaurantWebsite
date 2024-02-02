import Logo from "@/GeneralElements/Logo/Logo";
import { userStore } from "@/hooks/UserRedux/UserStore";
import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";
import ItemsModal from "./Components/ItemsModal";
import ProfileIcon from "./Components/ProfileIcon";
import { useState } from "react";
import { configs } from "@/Features/Core/CoreTexts";

export default function NavBar({ }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ItemsModal closeModal={() => setShowModal(false)} isOpen={showModal} />
            <nav className='main-nav__nav-bar d-space mb-8'>
                <Logo className=" text-2xl"/>

                <Button onClick={() => setShowModal(true)} className="sm">
                    <i className="fa-solid fa-bars"></i>
                </Button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="list-none font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
                        {
                            configs.navItem.map((e, idx) => <li key={idx}>
                                <a href={e.href} className="block py-2 px-3  rounded  md:hover:bg-transparent md:border-0 md:p-0">{e.text}</a>
                            </li>)
                        }


                    </ul>
                </div>
                <div className='lg'>
                    {
                        userStore.getState().user.user == null ?
                            <div className='d-flex-1'>
                                <Link to="/login">
                                    <Button>
                                        تسجيل الدخول
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button>
                                        إنشاء حساب جديد
                                    </Button>
                                </Link>
                            </div> : <ProfileIcon />
                    }
                </div>
            </nav>
        </>

    )
}
