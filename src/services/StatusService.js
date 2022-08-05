import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const StatusService = {
  getAllStatus: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Status/getAll`,
      method: "GET",
    });
  },
};
