import { z } from 'zod';
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const userModel = z.object({
    _id: z.string().optional().nullable(),
    name: z.string().min(3, { message: "يجب الا يقل الإسم عن 3 احرف" }).max(32, { message: "يجب الا يزيد الإسم عن 32 حرف" }),
    email: z.string().min(3, { message: "يجب الا يقل الايميل عن 3 احرف" }).max(32, { message: "يجب الا يزيد الايميل عن 32 حرف" }).email({ message: "من فضلك ادخل ايميل صالح" }),
    password: z.string().min(8, { message: "يجب الا يقل الباسورد عن 8 احرف" }).max(200, { message: "يجب الا يزيد الباسورد عن 100 حرف" }).nullable(),
    phone: z.string().regex(phoneRegex, 'من فضلك ادخل رقم هاتف صحيح').min(11, { message: "يجب الا يقل رقم الهاتف عن 11 احرف" }).max(15, { message: "يجب الا يزيد رقم الهاتف عن 15 حرف" }),
    gender: z.boolean(),
    verifiedEmail: z.boolean().optional().nullable(),
    banned: z.boolean().optional().nullable(),
    cart: z.array(z.object({
        mealId: z.string(),
        mealNumber: z.number(),
        size: z.string(),
    })).nullable().optional(),
    addresses: z.array(z.object({
        address: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        street: z.string().optional().nullable(),
        _id: z.string().optional().nullable(),
    })).nullable().optional(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
});

export default userModel;