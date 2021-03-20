// extract error messages from an error from server
export function getErrorMessages(error) {
  const errorMessages = [];
  if (error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error) => errorMessages.push(error.message));
  } else if (error.response.data.error) {
    errorMessages.push(error.response.data.message);
  }
  if (errorMessages) {
    return errorMessages;
  }
  return ['Something went wrong, sorry!'];
}
