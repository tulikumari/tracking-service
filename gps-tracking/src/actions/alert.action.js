const generalMessage = {
  ReturnValue: "",
  ErrorCode: "",
  ErrorMessage: "",
  ErrorDetails: ""
};

const success = (response, message) => {
  return { ...generalMessage, ...response, ErrorMessage: message };
};

const error = (response, message) => {
  return typeof response  === 'object' ?  { ...generalMessage, ...response,  ErrorMessage: message } : { ...generalMessage, ErrorMessage: message };
};

export const alertActions = {
  success,
  error
};
