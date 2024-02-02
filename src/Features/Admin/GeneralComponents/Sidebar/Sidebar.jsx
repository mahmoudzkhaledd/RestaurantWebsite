import { Link } from "react-router-dom";
import { adminConfig } from "../../AdminConfig";
import Logo from "@/GeneralElements/Logo/Logo";
import { useDispatch } from "react-redux";
import { logOut } from "@/hooks/AdminRedux/AdminModelSlice";
import { adminAxios } from "@/Utils/AdminAxios";
export default function Sidebar({ className = "", selected }) {

    const disp = useDispatch();
    return (
        <aside
            id="default-sidebar"
            className={className}
            aria-label="Sidebar"
        >
            <div style={{ backgroundColor: "var(--secondary)" }} className="h-full px-3 py-4 overflow-y-auto ">
                <div className='w-100 flex mb-5'>
                    <Logo className="mx-auto" link="/admin" />
                </div>
                <ul className="space-y-2 font-medium list-none">
                    {
                        Object.values(adminConfig.sidebarItems).map((e, idx) => <li key={idx}>
                            <Link
                                target={e.newPage ? "_blank" : ""}
                                onClick={e.action == "logout" ? () => {
                                    disp(logOut());
                                    window.location.href = "/admin/login";
                                } : null}
                                to={e.link != null ? e.link : e.name && `/admin/${e.name}`}
                                className={`flex ${selected == e.name ? "bg-[color:var(--primary-select)]" : ""} items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                            >
                                <span className={e.icon}></span>
                                <span className="ms-3">{e.title}</span>
                            </Link>
                        </li>
                        )
                    }
                    <Link
                        onClick={async () => {
                            try {
                                localStorage.removeItem('a_token')
                                window.location.href = '/admin/login'
                            } catch (ex) {

                            }
                        }}

                        className={`flex items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                    >

                        <i className="fa-solid fa-right-from-bracket text-[color:var(--text)]"></i>
                        <span className="ms-3">تسجيل الخروج </span>
                    </Link>
                    <Link
                        onClick={async () => {
                            try {
                                await adminAxios.put('admins/update-master-roles');
                            } catch (ex) {

                            }
                        }}

                        className={`flex items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                    >

                        <span className="ms-3">تحديث الصلاحيات</span>
                    </Link>

                </ul>
            </div>
        </aside>
    )
}
