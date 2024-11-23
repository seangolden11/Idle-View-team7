import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css';
import './CalenderWidget.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarWidget() {
  const [value, onChange] = useState<Value>(new Date());

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    // view가 'month'일 때만 주말을 체크
    if (view === 'month') {
      const day = date.getDay();
      if (day === 0 || day === 6) {
        return 'holiday';
      }
    }
    return null;
  };

  return (
    <div className='noglobal'>
      <Calendar 
      onChange={onChange} value={value} tileClassName={tileClassName}
      formatDay={(locale, date) => moment(date).format("DD")}
      showNeighboringMonth={false}
       />
    </div>
  );
}

export default CalendarWidget;