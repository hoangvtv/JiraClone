import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const PriorityServices = {
  getAllPriority: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Priority/getAll`,
      method: "GET",
    });
  },
};
