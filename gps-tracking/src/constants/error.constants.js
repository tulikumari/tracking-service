/**
 * Summary: custom Error Const
 * Description: define message for given code
 * @author Pawan Gupta
 * @date  18 jan 2019
 */

export const customErrorConst = {
  ERROR_DEFAULT: "Not able to perform this action................",
  "0x0": "Success............",
  "0x80520102": "Operation Not Defined..........."
};

export const httpErrorConst = {
  500: "Internal Server Error."
};

export const validCodes = code => {
  if (code >= 200 && code < 400) {
    return true;
  }
  return false;
};

export const invalidToken = {
  401: "401"
};
