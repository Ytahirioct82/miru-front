import { instance } from "../../helpers/api";

const postUser = (userLog) => {
  return instance
    .post(`/user/login`, userLog)
    .then((response) => {
      return response;
    })
    .catch((error) => console.warn("catch", error));
};

export { postUser };
