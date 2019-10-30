import {
  customErrorConst,
  validCodes,
  httpErrorConst
} from "../constants/error.constants";
import { alertActions } from "../actions/alert.action";

/**
 * Description: Get the error message
 * @param {object}   response
 * @return {object}
 */
const response = (response, message) => {
  try {
    let responseData = {};
    let httpStatusCode;

    if (response) {
      responseData = response["data"];
      httpStatusCode = response["status"];
      const message = customErrorConst[response.data["ErrorCode"]];
      if (validCodes(httpStatusCode)) {
        return successResponse(response, message);
      } else {
        errorResponse(response, httpErrorConst[httpStatusCode], response.data["ErrorMessage"]);
      }
    }
  } catch (e) {
    return errorResponse("httpErrorConst[httpStatusCode]");
  }
};

/**
 * Description: Get the error message
 * @param {string}   errorMessage
 * @param {string}   serverMsg
 * @return {object}
 */
const errorResponse = (response, errorMessage, serverMsg) => {
  let errorMsg = errorMessage
    ? errorMessage
    : serverMsg
    ? serverMsg
    : customErrorConst.ERROR_DEFAULT;

  return alertActions.error(response, errorMsg); 
};

/**
 * Description: Get the success message
 * @param {string}   successMessage
 * @return {object}
 */
const successResponse = (response, message) => {
  return alertActions.success(response.data, message);
};

export const responseActions = {
  response,
  errorResponse,
  successResponse
};
