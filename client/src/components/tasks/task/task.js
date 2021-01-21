import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import style from './style';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

export default function Task(props) {
  const { name, isCompleted, dueDate } = props.task;

  return (
    <div style={style}>
      <FormControlLabel
        style={{
          display: 'inline-block',
        }}
        control={
          <Checkbox
            checked={isCompleted}
            onChange={() => props.onChange()}
            name="checkedA"
          />
        }
      />
      <div>
        <p
          style={{
            margin: '0px',
            fontSize: 'x-large',
            textDecoration: isCompleted ? 'line-through' : 'none',
            textAlign: 'center',
          }}
        >
          {name}
        </p>
        {dueDate && (
          <p
            style={{
              marginTop: '0px',
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
              color: 'gray',
            }}
          >
            <CalendarTodayOutlinedIcon fontSize="small" />

            {formatDate(new Date(dueDate))}
          </p>
        )}
      </div>

      <div>
        <IconButton aria-label="delete" onClick={() => props.onDelete()}>
          <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
        <IconButton onClick={() => props.showDetail()}>
          <InfoOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

function formatDate(taskDate) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = taskDate.getDate();
  const dayOfTheWeek = days[taskDate.getDay()];
  const month = months[taskDate.getMonth()];
  const year = taskDate.getYear();

  const status = new Date() <= taskDate ? 'Due ' : 'Overdue ';
  return status + dayOfTheWeek + ', ' + month + date;
}
