export const webConfig = {
    orderStages: [
        {
            state: "pending",
            name: "قيد الانتظار",
            icon: "fa-solid fa-hourglass-start",
            description: "وصل الطلب ولكن لم يتم بدء تجهيزه بعد",

        },
        {
            state: "cooking",
            name: "جاري التحضير",
            icon: "fa-solid fa-mortar-pestle",

            description: "يتم تجهيز الطلب حالياً وسيتم التسليم قريباً",
        },
        {
            state: "onway",
            name: "في الطريق",
            icon: "fa-solid fa-truck",
            description: "الطلب في طريقه إلى عنوان التوصيل.",
        },
        {
            state: "delivered",
            name: "تمت بنجاح",
            icon: "fa-solid fa-check",
            description: "تم تسليم الطلب بنجاح إلى العميل.",
        },
    ],
    refusedStages: [
        {
            state: "pending",
            name: "بالانتظار",
            icon: "fa-solid fa-hourglass-start",
            description: "الطلب قيد المراجعة. يتم في هذه المرحلة التحقق من جدية الطلب والعنوان قبل القبول. يُطلب من العملاء الانتظار لتلقي تحديثات حول حالة الطلب وتأكيده.",
        },
        {
            state: "refused",
            name: "تم الرفض",
            icon: "fa-solid fa-xmark",
            description: "تم رفض الطلب من قبل المطعم.",
        },
    ],
    canceledStages: [
        {
            state: "pending",
            name: "بالانتظار",
            icon: "fa-solid fa-hourglass-start",
            description: "الطلب قيد المراجعة. يتم في هذه المرحلة التحقق من جدية الطلب والعنوان قبل القبول. يُطلب من العملاء الانتظار لتلقي تحديثات حول حالة الطلب وتأكيده.",
        },
        {
            state: "canceled",
            name: "تم الالغاء",
            icon: "fa-solid fa-xmark",
            description: "تم إلغاء الطلب بواسطة العميل.",
        },
    ],
    maxItemsPerPage: 10,
}