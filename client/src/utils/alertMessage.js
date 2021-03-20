// error format on the backend
/* {
    error: 'errorType',
    message: 'message'
}
*/

// display  error messages
export function displayErrorMessages(error, setAlertState) {
  const errorMessages = [];
  if (error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error) => errorMessages.push(error.message));
  } else if (error.response.data.error) {
    errorMessages.push(error.response.data.message);
  }

  setAlertState({
    display: true,
    messages:
      errorMessages.length > 0 ? errorMessages : ['Something went wrong'],
    type: 'error',
  });
}

export function displaySuccessMessages(messages, setAlertState) {
  setAlertState({
    display: true,
    messages: messages,
    type: 'success',
  });
}

export function displayAlertMessages(option, setAlertState) {
  setAlertState({
    display: true,
    messages: option.messages,
    type: option.type,
  });
}
