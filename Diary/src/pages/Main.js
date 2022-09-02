// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

import { DiaryStateContext } from "../App";

import moment from "moment";
import "moment/locale/ko";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";

const TodoCalendarBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-family: "Hi Melody", cursive;
  border-radius: 10px;

  .react-calendar {
    border: 0;
    border-radius: 10px;
    padding: 10px;
    line-height: 2em;
    height: 450px;
    width: 450px;
    color: #6e6756;
    background-color: #eae3d2;
    font-size: 20px;
    font-family: "Hi Melody", cursive;
  }
  abbr {
    text-decoration: none;
  }
  .react-calendar__navigation {
    margin-top: 30px;
  }
  .react-calendar__tile--now {
    background-color: #1c3879;
    color: white;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #1c3879;
    color: white;
    opacity: 1;
  }
  .react-calendar__tile {
    border-radius: 10px;
    color: #837a64;
    margin-top: 10px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #607eaa;
    color: white;
  }
  .react-calendar__tile--active {
    background: #607eaa;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #607eaa;
    color: white;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

const Main = () => {
  const diaryList = useContext(DiaryStateContext);

  const [value, onChange] = useState(new Date());

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      console.log(new Date(firstDay));

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      console.log(new Date(lastDay));

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <MyHeader
        headText={"D i a r y   C a l e n d a r"}
        leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />}
      />
      <TodoCalendarBlock>
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("DD")}
          className="mx-auto w-full text-sm border-b"
          tileContent={({ date, view }) => {
            if (
              diaryList.find(
                (it) =>
                  `${getStringDate(new Date(it.date))}` ===
                  moment(date).format("YYYY. MM. DD")
              )
            ) {
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    <Dot />
                  </div>
                </>
              );
            }
          }}
        />
      </TodoCalendarBlock>
    </div>
  );
};

export default Main;
