import {
  USER_REGISTER_API,
  USER_SIGNIN_API,
} from "../constants/CyberBugs/CyberBugsContants";

export const signInCyberBugsAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};

export const registerCyberBugs = (name, email, phone, password) => {
  console.log("name", name, email, phone, password);
  return {
    type: USER_REGISTER_API,
    userRegister: {
      name: name,
      email: email,
      phone: phone,
      password: password,
    },
  };
};
