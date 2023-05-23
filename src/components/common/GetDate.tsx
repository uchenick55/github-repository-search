export type DataReturn2Type = {
    "Year": string,
    "Month": string,
    "Day": string,
    "Hour": string,
    "Minutes": string,
    "Seconds": string,
    isToday: boolean
};
type GetDateType = (customDate:string) => DataReturn2Type

const GetDate:GetDateType= (customDate) => {
    let Data = new Date( !customDate? 0: new Date(customDate).getTime() + 3*3600*1000)

    const isToday: boolean = !!customDate && // этот день сегодня?
        new Date().getFullYear() ===  Data.getFullYear() &&
        new Date().getMonth() === Data.getMonth() &&
        new Date().getDate() === Data.getDate()

    const Year =("0" + Data.getFullYear()).substr(-4) ;
    const Month =  Data.getMonth();
    const Day = ("0" +  Data.getDate()).substr(-2);
    const Hour = ("0" + Data.getHours()).substr(-2);
    const Minutes = ("0" + Data.getMinutes()).substr(-2) ;
    const Seconds = ("0" + Data.getSeconds()).substr(-2);
    let fMonth;

    switch (Month)
    {
        case 0: fMonth="01"; break;
        case 1: fMonth="02"; break;
        case 2: fMonth="03"; break;
        case 3: fMonth="04"; break;
        case 4: fMonth="05"; break;
        case 5: fMonth="06"; break;
        case 6: fMonth="07"; break;
        case 7: fMonth="08"; break;
        case 8: fMonth="09"; break;
        case 9: fMonth="10"; break;
        case 10: fMonth="11"; break;
        case 11: fMonth="12"; break;
        default: fMonth=""; break;
    }
    return {
        "Year": Year,
        "Month": fMonth,
        "Day": Day,
        "Hour": Hour,
        "Minutes": Minutes,
        "Seconds": Seconds,
        isToday: isToday
    }
}
export default GetDate
