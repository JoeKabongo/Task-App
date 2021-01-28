import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
  const { alerts, setAlertState, type } = props;
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAlertState({ display: false });
    }, 6000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ marginTop: '20px' }}>
      {alerts.map((alert, index) => (
        <MuiAlert
          elevation={0}
          variant="filled"
          children={alert}
          severity={type}
          key={index}
        />
      ))}
    </div>
  );
}
