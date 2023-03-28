import moment from "moment/moment";
import React, { useMemo, useState } from "react";
import style from "./Dates.module.css"
import cln from "classnames"
let data = require("../data.json")
let weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
let monthsVidminok = ["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"]
let months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень"," Вересень"," Жовтень"," Листопад"," Грудень"]
function Dates() {
    let [selectedDate, selectDate] = useState(null)
    const [selectedMonth, selectMonth] = useState(moment().format("DD.MM.YYYY"))
    function findEvents(day, month, year) {
       return data.filter(function(event) {
            return event.date.day === day && event.date.month === month && event.date.year === year
        })
        
    }
    const weeksData = useMemo(function() {
        if(!selectedMonth) {
            return([])
        }
        const selectedMonthDate = moment(selectedMonth, "DD.MM.YYYY")
        const daysInMonth = selectedMonthDate.daysInMonth();
        const dayOfWeek = selectedMonthDate.weekday()
        const weeks = []

        for (let i = 1; i <= daysInMonth; i++) {
            if (i === 1) {
                const month = selectedMonthDate.month() + 1
                const dateString = `01.${month < 10 ? "0" + month : month}.${selectedMonthDate.year()}`
                const currentWeekday = moment(dateString, "DD.MM.YYYY").weekday() || 7

                if(currentWeekday === 1)  { 
                    weeks.push([{
                        number: 1,
                        events: findEvents(1, month, selectedMonthDate.year())
                    }])
                }
                else {
                    for (let i = 1; i < currentWeekday; i++) {
                        if (i === 1) {
                            weeks.push([null])
                        }
                        else {
                            weeks[0].push(null)
                        }
                    }
                    weeks[0].push({
                        number: 1,
                        events: findEvents(1, month, selectedMonthDate.year())
                    })
                }

            }
            else {
               const lastWeek = weeks.length - 1 
               if(weeks[lastWeek].length < 7) {
                weeks[lastWeek].push({
                    number: i,
                    events: findEvents(i, selectedMonthDate.month() + 1, selectedMonthDate.year())
                })
               }
               else {
                weeks.push([{
                    number: i,
                    events: findEvents(i, selectedMonthDate.month() + 1, selectedMonthDate.year())
                }])
               }
            }
        }   

        return(weeks)
        
    }, [selectedMonth])

function prevMonth() {
    const selectedMonthDate = moment(selectedMonth, "DD.MM.YYYY")
    const prev = selectedMonthDate
    const moveToPrevMonth = prev.subtract(1, 'months')

    selectMonth(moveToPrevMonth)
     
}

function nextMonth() {
    const selectedMonthDate = moment(selectedMonth, "DD.MM.YYYY")
    const next = selectedMonthDate
    const moveToPrevMonth = next.add(1, 'months')

    selectMonth(moveToPrevMonth)
     
}
const selectedMonthDate = moment(selectedMonth, "DD.MM.YYYY")
    return(
    <div className={style.wrap}>
        <h1 className={style.title}>Календар подій</h1>
        {selectedDate?<div className={style.modal}>

            <div className={style.modalList}>
            <span className={style.modalDate}>{selectedDate.number + " " + monthsVidminok[selectedMonthDate?.month()]}</span>
            <ul className={style.modalEvents}>
                {selectedDate.events.length ? selectedDate.events?.map(function(event) {
                return(
                    <React.Fragment>
                       

                            <li className={style.modalItem}>
                                <div className={style.itemIconSpace}>
                                    <div className={cln(style[event.type])}></div>
                                </div>
                                <div className={style.eventIdent}>
                                    <span className={style.eventName}>{event.event}</span>
                                    <span className={style.eventDesc}>{event.description}</span>
                                </div>
 
                            </li>

                    </React.Fragment>
                
                )
                
            }): <li className={style.noElements}>Подій немає <span className={style.bored}>¯\_(´ー`)_/¯</span></li>}
            </ul>
            </div>
        </div>:null}
        
        

                <ul className={style.weekDays}>
                {weekDays.map(function(day) {
                                return(
                    <li className={style.weekDay}>{day}</li>
                    )
                })}
                </ul>


        {
        weeksData.map(function(item) {

            return(

                <div className={style.week}>
                    {item.map(function(date) {

                       return(
                        <span className={cln(style.date, date && date?.number === selectedDate?.number ? style.dateActive : "")} onClick = {() => {
                            selectDate(date)
                        }}>{`${date?.number || ''}`}
                            {date?.events?.length ? <span className={style.eventNum}>{date?.events?.length || ''}</span> : null}
                        </span>
                       ) 
                    })}
                </div>

            )
            
        })
    }
    
    
    <div className={style.weekButtons}>          
    <button className={style.prevMonth } onClick={prevMonth}><span className = {style.leftArrow}>{"←"}</span> Попередній місяць</button>
    <span className={style.chosenMonth}>{`${months[selectedMonthDate?.month()]}, ${selectedMonthDate?.year()}`}</span>
    <button className={style.nextMonth} onClick={nextMonth}>Наступний місяць <span className = {style.rightArrow}>{"→"}</span></button>

    </div>
    </div>
    )
    
}

export default Dates;