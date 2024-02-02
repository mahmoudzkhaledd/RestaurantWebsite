const getObjectWithArray = (obj, arrName) => {
    const newObj = {};
    for (const i of Object.keys(obj)) {
        if (i.startsWith(arrName)) {
            if (newObj[arrName] != null) {
                newObj[arrName].push(obj[i]);
            } else {
                newObj[arrName] = [obj[i]];
            }
        } else {
            newObj[i] = obj[i];
        }
    }
    if (newObj[arrName] == null) {
        newObj[arrName] = [];
    }
    return newObj;
}
const getObjectWithNestedObjects = (obj, arrName) => {
    const newObj = {};
    for (const i of Object.keys(obj)) {
        if (i.startsWith(`${arrName}-`)) {
            const splt = i.split('-');
            if (newObj[splt[0]] == null) {
                newObj[splt[0]] = {};
            }
            newObj[splt[0]][splt[1]] = obj[i];
        } else {
            newObj[i] = obj[i];
        }
    }
    if (newObj[arrName] == null) {
        newObj[arrName] = [];
    }
    return newObj;
}
const getOrderStatus = (status) => {
    return status == "pending" ? "قائم" :
        status == "cooking" ? "جاري التحضير" :
            status == "refused" ? "تم الرفض" :
                status == "canceled" ? "تم الالغاء" :
                    status == "onway" ? "في الطريق" : "تم التوصيل";
};
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " سنة";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " شهر";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " يوم";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " ساعة";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " دقيقة";
    }
    if (Math.floor(seconds) < 0) {
        return 0 + "ثانية ";
    }
    return Math.floor(seconds) + " ثانية";
}
export {
    getObjectWithArray,
    getObjectWithNestedObjects,
    getOrderStatus,
    timeSince,
}