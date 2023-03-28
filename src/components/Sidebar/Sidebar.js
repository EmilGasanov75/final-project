import moment from "moment"
import { useMemo } from "react"
import style from "./Sidebar.module.css"
import MyTimer from "../Countdown/Countdown"
let jsonStorage = require("../data.json")
function Sidebar() {
    let memo = useMemo(function() {
        const currentDay = moment().date()
        const currentMonth = moment().month() + 1
        const currentYear = moment().year()
        const filteredEvents = jsonStorage.filter(function(event) {
            return(event.date.day > currentDay && event.date.month === currentMonth && event.date.year === currentYear) ||
            event.date.month > currentMonth && event.date.year === currentYear || event.date.year > currentYear
        })
        return(filteredEvents[0])
    })
    const expiryDate = useMemo(function() {
        const dateString = `${memo.date.day < 10 ? "0" + memo.date.day : memo.date.day}.${memo.date.month < 10 ? "0" + memo.date.month : memo.date.month}.${memo.date.year}`
        return(moment(dateString, "DD.MM.YYYY").toDate())
    })
    return(
        <div className={style.sidebar}>
             <div className={style.appLogo}>
                <div className={style.logo}>

                </div>
                <span className={style.AppName}>HighTime</span>
            </div>
            <div className={style.bDay}>
                <div className={style.bDayLogo}>
                    <div className={style.clock}>
                        <MyTimer expiryTimestamp={expiryDate}/>
                    </div>
                </div>

                
            </div>
        </div>

    )
}

export default Sidebar