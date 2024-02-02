
import { useState } from "react";
import { adminAxios } from "@/Utils/AdminAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import Button from "@/GeneralElements/Button/Button";
import AdminRolesAdder from "../Components/AdminRolesAdderComponent/AdminRolesAdder";
import { adminRoles } from "@/Utils/AdminRoles";
import { toast } from "react-toastify";
import { z } from 'zod';

const adminModel = z.object({
    name: z.string()
        .min(3, { message: "يجب أن يكون إسم المستخدم أكثر من 3 احرف" })
        .max(100, { message: "يجب أن يكون إسم المستخدم أقل من 100 حرف" }),
    email: z.string()
        .min(3, { message: "يجب أن يكون الايميل  أكثر من 3 احرف" })
        .max(100, { message: "يجب أن يكون الايميل أقل من 100 حرف" }),
    username: z.string()
        .min(3, { message: "يجب أن يكون إسم المستخدم أكثر من 3 احرف" })
        .max(100, { message: "يجب أن يكون إسم المستخدم أقل من 100 حرف" }),
    password: z.string()
        .min(8, { message: "يجب أن يكون الباسورد أكثر من 8 احرف" })
        .max(100, { message: "يجب أن يكون الباسورد أقل من 100 حرف" })
        .nullable().optional(),
    pinNumber: z.string()
        .refine((value) => value.length === 6, {
            message: "يجب أن يكون رمز الحماية 6 ارقام فقط!",
        })
        .refine((value) => !isNaN(parseInt(value)), {
            message: "يجب أن يكون رمز الحماية 6 ارقام فقط!",
        })
        .refine((value) => parseInt(value) >= 0, {
            message: "يجب أن يكون رمز الحماية 6 ارقام فقط!",
        })
        .refine((value) => parseInt(value) < 1000000, {
            message: "يجب أن يكون رمز الحماية 6 ارقام فقط!",
        }).nullable().optional(),
    phone: z.string()
        .min(11, { message: "يجب أن يكون الهاتف أكثر من 10 احرف" })
        .max(15, { message: "يجب أن يكون الهاتف أقل من 15 حرف" }),
    roles: z.record(z.boolean()),

});
function getRolesChecked() {
    const obj = {};
    const eles = document.getElementsByClassName("chk-role");
    for (const ele of eles) {
        obj[ele.name] = ele.checked;
    }
    return obj;
}
function generatePassword() {
    var chars = "189abcdrefghiQjklm@nopq7s5Dtu4v3wxyzACE#FGHIJKL6MNO#PRSBT2UVWXY0Z";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}
export default function AddNewAdmin({ editMode }) {
    const params = useParams();
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();


    const addAdmin = async () => {
        const form = document.getElementById("add-admin-form");
        const { name, email, username, password, pinNumber, phone, } = Object.fromEntries(new FormData(form).entries());
        const obj = getRolesChecked();
        if (Object.keys(obj).length != adminRoles.length) {
            if (obj[i.ref] == null) {
                toast.error("الرجاء ادخال كافة الصلاحيات")
                return;
            }
        }
        for (const i of adminRoles) {
            if (obj[i.ref] == null) {
                toast.error("الرجاء ادخال كافة الصلاحيات")
                return;
            }
        }

        setLoading('add');
        try {
            const data = await adminModel.parseAsync({
                name,
                email,
                username,
                password: password || null,
                pinNumber: pinNumber || null,
                phone,
                roles: obj,
            })

            const res = editMode ? await adminAxios.put(`/admins/${admin._id}`, { ...data, roles: obj }) : await adminAxios.post("/admins", { ...data, roles: obj });
            if (res.data.admin != null) {
                refetch()
                nav(`/admin/admins/${res.data.admin._id}`, { replace: true })
            }

        } catch (ex) {

            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
        setLoading(null);
    }


    const editPassword = async (e) => {
        e.preventDefault();
        const { password, pinNumber } = Object.fromEntries(new FormData(document.getElementById('frm-passwords')).entries());

        if (!password || password.length == 0 || password.length > 100 || password.length < 8) {
            toast.error("يجب ان تكون كلمة المرور بين 8 احرف و 100 حرف")
            return;
        }
        if (!pinNumber || pinNumber.length != 6) {
            toast.error("يجب أن يكون رمز الحماية 6 ارقام فقط")
            return;
        }
        setLoading('pass');
        try {
            const res = await adminAxios.put(`/admins/${admin._id}/change-password`,
                { password, pinNumber });
            if (res.data.admin != null) {
                // nav(`/admin/admins/${res.data.admin._id}`, { replace: true })
            }
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
        setLoading(null);
    };
    const { isLoading, error, data, refetch, } = useQuery(
        `get-admin-edit-${params.id}`,
        () => adminAxios.get(`admins/${params.id || ""}`),
        {
            retry: 0,
            enabled: params.id != null && editMode == true,
            refetchOnWindowFocus: false,
        },
    );

    if (isLoading) {
        return <Spinner />;
    }
    const admin = !editMode ? null : data?.data.admin;
    if (error || (admin == null && params.id != null && editMode == true)) {
        return <SorryDiv message="هذه الوجبة غير موجودة, الرجاء المحاولة مرة اخرى مع الوجبة مختلفة" />
    }
    const randomPassword = () => {
        document.getElementById('text-password').value = generatePassword();
    }
    const randomPin = () => {
        document.getElementById('text-pin').value = Math.floor(100000 + Math.random() * 900000).toString();
    }
    return (
        <>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-2">
                    <div className="h-fit mb-8 w-full bg-[color:var(--secondary)] rounded-lg shadow  md:mt-0 xl:p-0  ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                {
                                    editMode ? "تعديل حساب مدير" : "اضافة مدير جديد"
                                }
                            </h1>

                            <form id="add-admin-form" className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <TextBox initialValue={admin?.name} disabled={loading} name="name" placeholder="اسم المدير" label="اسم المدير" />
                                <TextBox initialValue={admin?.email} disabled={loading} name="email" placeholder="الايميل" label="الايميل" />
                                <TextBox initialValue={admin?.username} disabled={loading} name="username" placeholder="اسم المستخدم" label="اسم المستخدم" />
                                {
                                    !editMode && <>
                                        <div className="flex flex-row gap-3 w-100 items-end">
                                            <TextBox id="text-password" className="w-100" disabled={loading} name="password" placeholder="كلمة المرور" label="كلمة المرور" />
                                            <Button onClick={randomPassword} className="m-0 h-[45px]" >
                                                <i className="fa-solid fa-shuffle"></i>
                                            </Button>
                                        </div>
                                        <div className="flex flex-row gap-3 w-100 items-end">
                                            <TextBox id="text-pin" className="w-100" maxLength={6} disabled={loading} name="pinNumber" placeholder="رمز الحماية" label="رمز الحماية" />
                                            <Button onClick={randomPin} className="m-0  h-[45px]" >
                                                <i className="fa-solid fa-shuffle "></i>
                                            </Button>
                                        </div>

                                    </>
                                }

                                <TextBox initialValue={admin?.phone} disabled={loading} name="phone" placeholder="رقم الهاتف" label="رقم الهاتف" />

                                <Button loading={loading == 'add'} disabled={loading != null} className=" mr-auto" onClick={addAdmin} >
                                    {editMode ? "تعديل المدير" : "إضافة المدير"}
                                </Button>
                            </form>
                        </div>

                    </div>
                    {
                        editMode &&
                        <div className="h-fit  w-full bg-[color:var(--secondary)] rounded-lg shadow  md:mt-0 xl:p-0  ">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">


                                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                    كلمة المرور
                                </h1>

                                <form id="frm-passwords" className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                    <TextBox disabled={loading} type="password" name="password" placeholder="كلمة المرور" label="كلمة المرور" />
                                    <TextBox maxLength={6} disabled={loading} name="pinNumber" placeholder="رمز الحماية" label="رمز الحماية" />
                                    <Button loading={loading == 'pass'} disabled={loading != null} className=" mr-auto" onClick={editPassword} >
                                        تعديل كلمة المرور
                                    </Button>
                                </form>
                            </div>
                        </div>
                    }
                </div>

                <form id="roles-form" className="" onSubmit={(e) => e.preventDefault()} >

                    <AdminRolesAdder selectedRoles={admin?.roles} className="col-span-full xl:col-auto mb-4" />
                </form>

            </div>
            <br />
            <br />
            <br />
        </>
    )
}
