/**
 * Summary: Summary of the source action
 * Description: Create sources related functionality
 * @author Pawan Gupta
 * @date  18 jan 2019
 */

//Import
import { APIService } from "../service/api";
import { urlConstants } from "../constants/uri.constants";

//Public Method
/**
 * Description: handle getdata
 * @return {Promise}
 */
const getAllSource = () => {
  let url = "";
  let body = { OperationType: "10300", Data: "N/A" };
  let header = {};
  url = urlConstants.BASEURL;

  return APIService.post(url, header, body).then(
    data => {
      return data;
    },
    error => {
      return error;
    }
  );
};

/**
 * Description: handle getdata
 * @return {Promise}
 */
const getSourceById = (_sourceID = "Default") => {
  let url = "";
  let body = { OperationType: "10300", Data: { SourceID: _sourceID } };
  let header = {};
  url = urlConstants.BASEURL;

  return APIService.post(url, header, body).then(
    data => {
      return data;
    },
    error => {
      return error;
    }
  );
};

//Export testActions
export const sourceActions = {
  getSourceList,
  getSourceById
};
