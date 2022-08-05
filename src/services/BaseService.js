import { Axios } from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/system";

export class BaseService {
  put(url, id, model) {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}/${id}`,
      method: "PUT",
      data: model,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  }

  post(url, model) {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  }

  get(url) {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  }

  delete = (url) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
