import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const toShamsiDateTime = (dateString: string) => {
    if (!dateString || dateString.startsWith("0001-01-01")) {
        return "-";
    }

    const d = dayjs(dateString);

    return d.calendar("jalali").format("HH:mm:ss YYYY/MM/DD");
};


export const toFarsiStatus = (status: string) => {
    if (status == 'Initiated')
        return 'ایجاد شده';
    if (status == 'Open')
        return 'باز';
    if (status == 'Close')
        return 'بسته';

    return status;
};