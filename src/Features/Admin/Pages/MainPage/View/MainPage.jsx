import { adminConfig } from "../../../AdminConfig";
import { adminAxios } from "@/Utils/AdminAxios";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { store } from "@/hooks/AdminRedux/AdminStore";
import { useQuery } from "react-query";
import moment from "moment";
import { timeSince } from "@/Utils/Helper";
import { Link } from "react-router-dom";

export default function AdminMainPage({ }) {
    const { isLoading, error, data, refetch } = useQuery(
        "get-last-seen-admins",
        () => adminAxios.get('/admins/last-active'),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    return (
        <div>
            <h4 className=" mb-5">مرحبا {store.getState().admin.admin?.name}</h4>
            <div className=" grid grid-cols-3 gap-5">

                <div className="col-span-2 minpage__content w-full flex flex-row items-start justify-center flex-wrap gap-5" >
                    {
                        adminConfig.homepageCards.map((e, idx) =>
                            <div key={idx} className="flex flex-item gap-4 items-center px-7 py-4 bg-[color:var(--secondary)] rounded-lg ">
                                <div className="w-10 h-10 flex flex-col items-center justify-center text-blue-500 bg-blue-100 rounded-full">
                                    <i className={e.icon} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium ">
                                        {e.title}
                                    </p>
                                    <p className="text-lg font-semibold text-fade">
                                        0
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="col-span-1 h-fit rounded-lg bg-[color:var(--secondary)] p-4">
                    <h5 className="text-xl font-bold mb-5">اخر ظهور للمديرين</h5>
                    <div className="space-y-4">
                    {
                        isLoading ? <Spinner /> : (error || data?.data?.admins == null) ? <p></p> : 
                        data.data?.admins?.map((e, idx) => 
                        <Link to={`/admin/admins/${e._id}`} key={idx} className="flex flex-row justify-between items-center rounded-lg bg-[color:var(--secondary-select)] p-4">
                            <p>{e.name}</p>
                            <p>{e.lastActive != null ? timeSince(Date.parse(e.lastActive)) : "لم يدخل بعد"}</p>
                        </Link>)
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
