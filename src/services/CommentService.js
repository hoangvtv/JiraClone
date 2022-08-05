import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export const CommentService = {
  insertComment: (comment) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/insertComment`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: comment,
    });
  },

  getAllComment: (taskId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/getAll?taskId=${taskId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  },
};
