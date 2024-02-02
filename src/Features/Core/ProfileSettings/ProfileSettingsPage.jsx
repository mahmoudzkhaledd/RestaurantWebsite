
import AccountBasics from "./Components/AccountBasics";
import AccountAddresses from "./Components/AccountAddresses";
import AccountPassword from "./Components/AccountPassword";


export default function ProfileSettingsPage({ }) {
   
    return (
        <div className=" pt-6 flex-col">
            <div className="col-span-full mb-4">
                <h1 className="text-xl font-semibold  sm:text-2xl">
                    اعدادات البروفايل
                </h1>
            </div>

            <div className="">

                <AccountBasics />
                <AccountAddresses />
                <AccountPassword />

            </div>
        </div>
    )
}
