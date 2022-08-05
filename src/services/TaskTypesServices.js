import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const TaskTypesServices = {
  getAllTaskTypes: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/TaskType/getAll`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};
