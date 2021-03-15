// error format on the backend
/* {
    error: 'errorType',
    message: 'message'
}
*/

// display  error messages
export function displayErrorMessages(error, showAlertMessage) {
  const errorMessages = [];
  if (error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error) => errorMessages.push(error.message));
  } else if (error.response.data.error) {
    errorMessages.push(error.response.data.message);
  }

  showAlertMessage({
    display: true,
    messages:
      errorMessages.length > 0 ? errorMessages : ['Something went wrong'],
    type: 'error',
  });
}
